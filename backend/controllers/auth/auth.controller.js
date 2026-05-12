import * as authService from "../../services/auth/auth.service.js";
import { successResponse, paginatedResponse } from "../../utils/http.js";
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  setCsrfCookie,
  generateCsrfToken,
} from "../../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.user, req.validated.body);
    res.status(201).json(successResponse(user));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = {
      ...req.validated.body,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    const result = await authService.login(data);

    setRefreshTokenCookie(res, result.refreshToken, result.rememberMe);
    const csrfToken = generateCsrfToken();
    setCsrfCookie(res, csrfToken);

    res.status(200).json(
      successResponse({
        user: result.user,
        accessToken: result.accessToken,
        csrfToken,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const result = await authService.refresh(refreshToken, req.validated.body || {});

    setRefreshTokenCookie(res, result.refreshToken, req.validated.body?.rememberMe);
    const csrfToken = generateCsrfToken();
    setCsrfCookie(res, csrfToken);

    res.status(200).json(
      successResponse({
        accessToken: result.accessToken,
        csrfToken,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    await authService.logout(refreshToken);
    clearRefreshTokenCookie(res);
    res.status(200).json(successResponse({ message: "Logged out" }));
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    await authService.logout(refreshToken, true);
    clearRefreshTokenCookie(res);
    res.status(200).json(successResponse({ message: "All sessions logged out" }));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json(successResponse(user));
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await authService.updateMe(req.user.id, req.validated.body);
    res.status(200).json(successResponse(user));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const result = await authService.changePassword(req.user.id, req.validated.body);
    res.status(200).json(successResponse(result));
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.validated.body);
    res.status(200).json(successResponse(result));
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.validated.body);
    res.status(200).json(successResponse(result));
  } catch (error) {
    next(error);
  }
};

export const listSessions = async (req, res, next) => {
  try {
    const sessions = await authService.listSessions(req.user.id);
    res.status(200).json(successResponse(sessions));
  } catch (error) {
    next(error);
  }
};

export const revokeSession = async (req, res, next) => {
  try {
    const result = await authService.revokeSession(req.user.id, req.validated.params.id);
    res.status(200).json(successResponse(result));
  } catch (error) {
    next(error);
  }
};

export const getPermissions = async (req, res, next) => {
  try {
    const result = await authService.getPermissions(req.user.id);
    res.status(200).json(successResponse(result));
  } catch (error) {
    next(error);
  }
};
