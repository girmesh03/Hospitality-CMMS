import { body, param } from "express-validator";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../../utils/constants.js";

export const registerValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("firstName").isString().trim().isLength({ min: 1, max: 50 }).withMessage("First name is required"),
  body("lastName").isString().trim().isLength({ min: 1, max: 50 }).withMessage("Last name is required"),
  body("password")
    .isString()
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(`Password must be ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters`)
    .matches(/[A-Z]/).withMessage("Must contain uppercase letter")
    .matches(/[a-z]/).withMessage("Must contain lowercase letter")
    .matches(/[0-9]/).withMessage("Must contain a number")
    .matches(/[^A-Za-z0-9]/).withMessage("Must contain a special character"),
];

export const loginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  body("rememberMe").optional().isBoolean().withMessage("rememberMe must be a boolean"),
];

export const updateProfileValidator = [
  body("firstName").optional().isString().trim().isLength({ max: 50 }),
  body("lastName").optional().isString().trim().isLength({ max: 50 }),
  body("phone").optional().isString().trim(),
  body("jobTitle").optional().isString().trim(),
];

export const changePasswordValidator = [
  body("currentPassword").isString().notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isString()
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(`Password must be ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters`)
    .matches(/[A-Z]/).withMessage("Must contain uppercase letter")
    .matches(/[a-z]/).withMessage("Must contain lowercase letter")
    .matches(/[0-9]/).withMessage("Must contain a number")
    .matches(/[^A-Za-z0-9]/).withMessage("Must contain a special character"),
];

export const forgotPasswordValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
];

export const resetPasswordValidator = [
  body("token").isString().notEmpty().withMessage("Reset token is required"),
  body("password")
    .isString()
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(`Password must be ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters`)
    .matches(/[A-Z]/).withMessage("Must contain uppercase letter")
    .matches(/[a-z]/).withMessage("Must contain lowercase letter")
    .matches(/[0-9]/).withMessage("Must contain a number")
    .matches(/[^A-Za-z0-9]/).withMessage("Must contain a special character"),
];

export const sessionIdValidator = [
  param("id").isMongoId().withMessage("Invalid session ID"),
];
