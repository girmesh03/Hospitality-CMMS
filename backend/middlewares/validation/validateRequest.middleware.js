import { attachValidatedRequest } from "./attachValidatedRequest.middleware.js";
import { handleValidationResults } from "./handleValidationResults.middleware.js";

/**
 * Bundles validator chains with result handling and validated-request
 * normalization.
 *
 * @param {import("express-validator").ValidationChain[]} [validators=[]] - Validator chains.
 * @returns {import("express").RequestHandler[]} Ordered middleware list.
 */
export const validateRequest = (validators = []) => [
  ...validators,
  handleValidationResults,
  attachValidatedRequest,
];

export default validateRequest;
