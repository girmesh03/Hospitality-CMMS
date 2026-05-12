import { Router } from "express";
import { requireAuth } from "../middlewares/auth/requireAuth.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { normalizeValidated } from "../middlewares/validation/normalizeValidated.js";
import { authLimiter } from "../middlewares/security/rateLimiter.js";
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  sessionIdValidator,
} from "../validators/auth/auth.validators.js";
import {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
  listSessions,
  revokeSession,
  getPermissions,
} from "../controllers/auth/auth.controller.js";

const router = Router();

router.post("/register", requireAuth, registerValidator, validateRequest, normalizeValidated, register);
router.post("/login", authLimiter, loginValidator, validateRequest, normalizeValidated, login);
router.post("/refresh", refresh);
router.delete("/logout", logout);
router.delete("/sessions", requireAuth, logoutAll);
router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, updateProfileValidator, validateRequest, normalizeValidated, updateMe);
router.patch("/me/password", requireAuth, changePasswordValidator, validateRequest, normalizeValidated, changePassword);
router.post("/forgot-password", authLimiter, forgotPasswordValidator, validateRequest, normalizeValidated, forgotPassword);
router.post("/reset-password", authLimiter, resetPasswordValidator, validateRequest, normalizeValidated, resetPassword);
router.get("/sessions", requireAuth, listSessions);
router.delete("/sessions/:id", requireAuth, sessionIdValidator, validateRequest, normalizeValidated, revokeSession);
router.get("/permissions", requireAuth, getPermissions);

export default router;
