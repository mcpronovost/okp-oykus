import { routerConfig } from "./config";
import { getLocalizedRoute, switchRouteLanguage } from "./routes";

/**
 * Alias for getLocalizedRoute
 * @since 0.2.6
 */
export const r = getLocalizedRoute;

/**
 * Alias for switchRouteLanguage
 * @since 0.4.1
 */
export const switchLang = switchRouteLanguage;

/**
 * Get the router
 * @param toLang The target language code to use for the router
 * @param fromLang The language code to use as the base language for the router
 * @returns An object containing the router functions
 * @since 0.1.0
 */
export const getRouter = (
  toLang = routerConfig.currentLang || routerConfig.defaultLang || "en",
  fromLang = "en"
) => {
  return {
    r: (uri, params) => r(uri, toLang, fromLang, params),
    switchLang: (toLang = routerConfig.currentLang || routerConfig.defaultLang || "en", additionalParams) => switchLang(toLang, additionalParams),
  };
};
