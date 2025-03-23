import ROUTES from "./routes";

export const REGEX = {
  LANG_CODE: /^\/([a-z]{2})\//,
  PARAM: /{([^}]+)}/g,
  PARAM_REPLACE: /{[^}]+}/g,
};

export const enforceTrailingSlash = (pathname) => {
  if (!pathname.endsWith("/")) {
    const newPath = `${pathname}/${window.location.search}`;
    window.location.href = newPath;
  }
};

export const getLangAndPath = (fullpath) => {
  const [, langCode, ...pathParts] = fullpath.split(REGEX.LANG_CODE);
  const path = pathParts.join("/").replace(/\/$/, "");
  return {
    langCode,
    pathPart: path,
  };
};

export const getLang = () => {
  const { langCode } = getLangAndPath(window.location.pathname);
  return langCode;
};

export const getLangAndEnforceTrailingSlash = () => {
  const pathname = window.location.pathname;
  const { langCode } = getLangAndPath(pathname);
  enforceTrailingSlash(pathname);
  return langCode;
};

export const getRoute = (
  path,
  lang = "fr",
  routesList = null,
  parentPath = ""
) => {
  if (!routesList) routesList = ROUTES;
  if (path === "/") path = "";
  const params = {};

  for (const [key, route] of Object.entries(routesList)) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;
    const routePath = route.paths[lang];

    // Handle dynamic path segments
    if (routePath.toString().includes("{")) {
      // Extract parameter names from the route path
      const paramNames = [...routePath.matchAll(REGEX.PARAM)].map(
        (match) => match[1]
      );
      const pathPattern = routePath.replace(REGEX.PARAM, "([^/]+)");
      const regex = new RegExp(`^${pathPattern}$`);
      const matches = path.match(regex);

      if (matches) {
        // Store captured values with their parameter names
        paramNames.forEach((name, index) => {
          params[name] = matches[index + 1];
        });
        return [fullPath, { ...route, params }];
      }
    } else if (routePath === path) {
      return [fullPath, { ...route, params }];
    }

    // Check for child routes recursively
    if (route.children) {
      const childPath = `${route.paths[lang]}/`;
      if (
        path.startsWith(childPath) ||
        (routePath.includes("{") &&
          new RegExp(
            `^${routePath.replace(REGEX.PARAM_REPLACE, "[^/]+")}/`
          ).test(path))
      ) {
        const nextParentPath = parentPath ? `${parentPath}.${key}` : key;

        // Extract params from current level if it's a dynamic route
        if (routePath.includes("{")) {
          const paramNames = [...routePath.matchAll(/{([^}]+)}/g)].map(
            (match) => match[1]
          );
          const pathPattern = routePath.replace(REGEX.PARAM_REPLACE, "([^/]+)");
          const matches = path.match(new RegExp(`^${pathPattern}/`));
          if (matches) {
            paramNames.forEach((name, index) => {
              params[name] = matches[index + 1];
            });
          }
        }

        const childRoute = getRoute(
          path.replace(
            new RegExp(`^${routePath.replace(/{[^}]+}/g, "[^/]+")}/`),
            ""
          ),
          lang,
          route.children,
          nextParentPath
        );

        if (childRoute) {
          // Merge params from child route with current params
          return [childRoute[0], childRoute[1]];
        }
      }
    }
  }

  return [
    "error",
    {
      component: () => import("@/pages/Error404.jsx"),
      paths: {},
      auth: false,
      props: {},
      params: {},
    },
  ];
};

export const getLocalizedPath = (
  path,
  toLang = "fr",
  fromLang = "en",
  additionalParams = {}
) => {
  // Find the current route based on the path and current language
  const currentRoute = getRoute(path, fromLang);
  if (!currentRoute) return `/${toLang}/${path}`;

  const [routePath, routeData] = currentRoute;
  const params = { ...routeData.params, ...additionalParams };

  // Split the route path to handle nested routes
  const routeParts = routePath.split(".");
  let routesList = ROUTES;
  let toPath = "";

  // Build the new path by traversing the route tree
  for (let i = 0; i < routeParts.length; i++) {
    const part = routeParts[i];
    const currentPart = routesList[part];

    if (currentPart) {
      toPath += (i > 0 ? "/" : "") + currentPart.paths[toLang];
      routesList = currentPart.children || {};
    }
  }

  // Replace params in the path
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      toPath = toPath.replace(`{${key}}`, value);
    }
  }

  return `/${toLang}/${toPath}/`;
};
