/**
 * Router version number
 * @since 0.1.1
 */
export const version = "0.4.2";

/**
 * Constants for route parsing
 * @since 0.2.5
 */
export const REGEX = {
  LANG_CODE: /^\/([a-z]{2})\//,
  PARAM: /{([^}]+)}/g,
  PARAM_REPLACE: /{[^}]+}/g,
};

/**
 * Core router configuration
 * Default settings that can be overridden via initRouter()
 * @since 0.1.0
 */
export const routerConfig = {
  defaultLang: "en",
  currentLang: "en",
  supportedLangs: ["en"],
  routes: {},
  routeModules: undefined,
  views: {},
  viewsCache: new Map(),
  viewsPath: "/src/views",
  viewsExtension: "jsx",
  viewsExtensions: ["jsx", "tsx"],
};

/**
 * Initialize router with custom configuration
 * @param config Configuration object
 * @param config.defaultLang Default language code
 * @param config.currentLang Current language code
 * @param config.supportedLangs Array of supported languages
 * @param config.routes Routes configuration
 * @param config.routeModules Route modules from Vite's glob import
 * @param config.views View modules from Vite's glob import
 * @param config.viewsCache Views cache
 * @param config.viewsPath Path to the views folder
 * @param config.viewsExtensions Views extensions
 * @example
 * ```js
 * initRouter({
 *   defaultLang: "en",
 *   routes: { home: { view: "Home", paths: { en: "/home", fr: "/accueil" } } },
 *   views: { home: () => import("./views/Home.jsx") },
 * });
 * ```
 * @since 0.1.0
 */
export const initRouter = async (config = {}) => {
  Object.assign(routerConfig, config);
}; 