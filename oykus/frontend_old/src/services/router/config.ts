import type {
  RouterConfigType,
  ViewModulesType,
} from "@mcpronovost/okp-router";

export const ROUTER_CONFIG: RouterConfigType = {
  defaultLang: import.meta.env.VITE_LANG,
  supportedLangs: import.meta.env.VITE_LANGS.split(","),
  routeModules: import.meta.glob("/src/services/router/routes/**/*.js", {
    eager: true,
  }),
  views: import.meta.glob("/src/pages/**/*.{jsx,tsx}", {
    eager: false,
  }) as ViewModulesType,
  viewsPath: "/src/pages",
};
