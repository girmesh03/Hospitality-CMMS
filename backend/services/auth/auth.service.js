import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import UserSession from "../../models/userSession.model.js";
import * as jwtUtils from "../../utils/jwt.js";
import {
  BCRYPT_ROUNDS,
  MAX_LOGIN_ATTEMPTS,
  LOCKOUT_WINDOW_MINUTES,
  INITIAL_LOCKOUT_MINUTES,
  PASSWORD_HISTORY_COUNT,
} from "../../utils/constants.js";
import {
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
} from "../../utils/errors.js";

export const register = async (actor, data) => {
  const existingUser = await User.findOne({
    email: data.email.toLowerCase(),
    organizationId: actor.organizationId,
  });

  if (existingUser) {
    throw new ConflictError("Email already registered in this organization");
  }

  const user = await User.create({
    organizationId: actor.organizationId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: `${data.firstName} ${data.lastName}`,
    password: data.password,
    emailVerified: false,
    status: "active",
  });

  const { password, passwordHistory, ...userJson } = user.toJSON();
  return userJson;
};

export const login = async (data) => {
  const user = await User.findOne({ email: data.email.toLowerCase() });

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (user.status === "archived" || user.status === "disabled") {
    throw new ForbiddenError("Account is disabled");
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    const remainingMs = user.lockUntil.getTime() - Date.now();
    const remainingMin = Math.ceil(remainingMs / 60000);
    throw new ForbiddenError(`Account locked. Try again in ${remainingMin} minutes`);
  }

  const valid = await user.comparePassword(data.password);
  if (!valid) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockDuration = getLockDuration(user.loginAttempts);
      user.lockUntil = new Date(Date.now() + lockDuration * 60 * 1000);
      user.loginAttempts = 0;
    }

    await user.save();
    throw new UnauthorizedError("Invalid email or password");
  }

  user.loginAttempts = 0;
  user.lockUntil = null;
  user.lastLoginAt = new Date();
  user.lastLoginIp = data.ip || null;
  await user.save();

  const sessionId = new UserSession()._id.toString();
  const refreshToken = jwtUtils.signRefreshToken();
  const hashedRefresh = jwtUtils.hashToken(refreshToken);
  const expiresAt = jwtUtils.getRefreshTokenExpiry(data.rememberMe);

  await UserSession.create({
    _id: sessionId,
    userId: user._id,
    organizationId: user.organizationId,
    refreshToken: hashedRefresh,
    userAgent: data.userAgent || null,
    ip: data.ip || null,
    issuedAt: new Date(),
    lastActivityAt: new Date(),
    expiresAt,
  });

  const accessToken = jwtUtils.signAccessToken({
    id: user._id,
    organizationId: user.organizationId,
    sessionId,
    roleKeys: [],
    propertyIds: [],
    permissionHash: "",
  });

  const { password: _, passwordHistory: __, ...userJson } = user.toJSON();

  return {
    user: userJson,
    accessToken,
    refreshToken,
    rememberMe: data.rememberMe || false,
  };
};

export const refresh = async (refreshToken, data) => {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token required");
  }

  const hashed = jwtUtils.hashToken(refreshToken);
  const session = await UserSession.findOne({
    refreshToken: hashed,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });

  if (!session) {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }

  const user = await User.findById(session.userId);
  if (!user || user.status === "archived" || user.status === "disabled") {
    session.revoked = true;
    session.revokedAt = new Date();
    session.revocationReason = "User disabled";
    await session.save();
    throw new ForbiddenError("Account is disabled");
  }

  // Rotate refresh token
  const newRefreshToken = jwtUtils.signRefreshToken();
  const newHashed = jwtUtils.hashToken(newRefreshToken);
  const newExpiresAt = jwtUtils.getRefreshTokenExpiry(data.rememberMe);

  session.refreshToken = newHashed;
  session.lastActivityAt = new Date();
  session.expiresAt = newExpiresAt;
  await session.save();

  const accessToken = jwtUtils.signAccessToken({
    id: user._id,
    organizationId: user.organizationId,
    sessionId: session._id,
    roleKeys: [],
    propertyIds: [],
    permissionHash: "",
  });

  return { accessToken, refreshToken: newRefreshToken };
};

export const logout = async (refreshToken, allSessions = false) => {
  if (!refreshToken && !allSessions) return;

  if (allSessions) {
    const session = await UserSession.findOne({
      refreshToken: jwtUtils.hashToken(refreshToken),
    });
    if (session) {
      await UserSession.updateMany(
        { userId: session.userId, revoked: false },
        { revoked: true, revokedAt: new Date(), revocationReason: "Logout all sessions" }
      );
    }
    return;
  }

  const hashed = jwtUtils.hashToken(refreshToken);
  const session = await UserSession.findOne({ refreshToken: hashed, revoked: false });
  if (session) {
    session.revoked = true;
    session.revokedAt = new Date();
    session.revocationReason = "User logout";
    await session.save();
  }
};

export const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password -passwordHistory");
  if (!user) throw new NotFoundError("User");
  return user;
};

export const updateMe = async (userId, data) => {
  const allowed = ["firstName", "lastName", "phone", "jobTitle"];
  const updates = {};
  for (const key of allowed) {
    if (data[key] !== undefined) updates[key] = data[key];
  }
  if (updates.firstName || updates.lastName) {
    updates.displayName = `${updates.firstName || (await User.findById(userId)).firstName} ${updates.lastName || (await User.findById(userId)).lastName}`;
  }

  const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password -passwordHistory");
  if (!user) throw new NotFoundError("User");
  return user;
};

export const changePassword = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User");

  const valid = await user.comparePassword(data.currentPassword);
  if (!valid) throw new UnauthorizedError("Current password is incorrect");

  for (const oldHash of user.passwordHistory || []) {
    const match = await bcrypt.compare(data.newPassword, oldHash);
    if (match) {
      throw new ConflictError("Cannot reuse a recent password");
    }
  }

  if (user.passwordHistory) {
    user.passwordHistory.push(user.password);
    if (user.passwordHistory.length > PASSWORD_HISTORY_COUNT) {
      user.passwordHistory = user.passwordHistory.slice(-PASSWORD_HISTORY_COUNT);
    }
  } else {
    user.passwordHistory = [user.password];
  }

  user.password = data.newPassword;
  await user.save();

  await UserSession.updateMany(
    { userId: user._id, revoked: false },
    { revoked: true, revokedAt: new Date(), revocationReason: "Password changed" }
  );

  return { message: "Password changed successfully" };
};

export const forgotPassword = async (data) => {
  const user = await User.findOne({ email: data.email.toLowerCase() });
  if (!user) return { message: "If the email exists, a reset link has been sent" };

  const resetToken = jwtUtils.signRefreshToken();
  const hashed = jwtUtils.hashToken(resetToken);
  user.resetPasswordToken = hashed;
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  return { resetToken, email: user.email, message: "Reset link sent" };
};

export const resetPassword = async (data) => {
  const hashed = jwtUtils.hashToken(data.token);
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) throw new UnauthorizedError("Invalid or expired reset token");

  user.password = data.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  if (user.passwordHistory) {
    user.passwordHistory.push(user.password);
    if (user.passwordHistory.length > PASSWORD_HISTORY_COUNT) {
      user.passwordHistory = user.passwordHistory.slice(-PASSWORD_HISTORY_COUNT);
    }
  }

  await user.save();

  await UserSession.updateMany(
    { userId: user._id, revoked: false },
    { revoked: true, revokedAt: new Date(), revocationReason: "Password reset" }
  );

  return { message: "Password reset successfully" };
};

export const listSessions = async (userId) => {
  const sessions = await UserSession.find({ userId, revoked: false })
    .select("userAgent ip issuedAt lastActivityAt expiresAt")
    .sort({ lastActivityAt: -1 });
  return sessions;
};

export const revokeSession = async (userId, sessionId) => {
  const session = await UserSession.findOne({ _id: sessionId, userId, revoked: false });
  if (!session) throw new NotFoundError("Session");

  session.revoked = true;
  session.revokedAt = new Date();
  session.revocationReason = "Manual revocation";
  await session.save();

  return { message: "Session revoked" };
};

export const getPermissions = async (userId) => {
  const user = await User.findById(userId).populate("roleIds");
  if (!user) throw new NotFoundError("User");

  const permissions = new Set();
  for (const role of user.roleIds || []) {
    for (const perm of role.permissions || []) {
      permissions.add(perm);
    }
  }

  return { permissions: [...permissions] };
};

function getLockDuration(attemptCount) {
  const durations = [15, 30, 60, 120, 240, 480, 1440];
  const index = Math.min(Math.floor((attemptCount - 1) / MAX_LOGIN_ATTEMPTS), durations.length - 1);
  return durations[index] || INITIAL_LOCKOUT_MINUTES;
}
