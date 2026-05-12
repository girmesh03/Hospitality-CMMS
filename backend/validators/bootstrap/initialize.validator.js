import { body } from "express-validator";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../../utils/constants.js";

export const initializeValidator = [
  body("orgName")
    .isString()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Organization name must be 3-100 characters"),
  body("subdomain")
    .optional()
    .isString()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .isLength({ min: 3, max: 50 })
    .withMessage("Subdomain must be 3-50 characters, lowercase alphanumeric with hyphens"),
  body("timezone")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Timezone is required"),
  body("currency")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-letter ISO 4217 code"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("firstName")
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be 1-50 characters"),
  body("lastName")
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be 1-50 characters"),
  body("password")
    .isString()
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(`Password must be ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters`)
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
  body("confirmPassword")
    .isString()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
