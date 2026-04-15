import { ROUTES } from "./constants.js";

/**
 * Replaces dynamic route tokens such as `:workOrderId` with concrete values.
 *
 * @param {string} routeTemplate - Route template from shared constants.
 * @param {Record<string, string | number>} [params={}] - Route-parameter values.
 * @returns {string} Resolved route path.
 */
export const fillRouteParams = (routeTemplate, params = {}) =>
  routeTemplate.replace(/:([A-Za-z][A-Za-z0-9_]*)/g, (_, token) => {
    const value = params[token];
    return value === undefined ? `:${token}` : encodeURIComponent(String(value));
  });

/**
 * Resolves a named route from `client/src/utils/constants.js`.
 *
 * @param {keyof typeof ROUTES} routeKey - Route-map key.
 * @param {Record<string, string | number>} [params={}] - Route parameters.
 * @returns {string} Resolved route path.
 */
export const getRoutePath = (routeKey, params = {}) => {
  const routeTemplate = ROUTES[routeKey];

  if (!routeTemplate) {
    throw new Error(`Unknown route key: ${routeKey}`);
  }

  return fillRouteParams(routeTemplate, params);
};
