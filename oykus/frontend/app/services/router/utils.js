/**
 * Constants for route parsing
 */
export const REGEX = {
  LANG_CODE: /^\/([a-z]{2})\//,
  PARAM: /{([^}]+)}/g,
  PARAM_REPLACE: /{[^}]+}/g,
};

/**
 * Get the language code and URI from a specific path
 */
export const getLangAndUri = (path) => {
  const [, langCode, ...uriParts] = path.split(REGEX.LANG_CODE);
  const uri = uriParts.join("/");
  return {
    langCode,
    uri,
  };
};

/**
 * Recursively finds a route
 */
export const getRoute = (
  path,
  lang = "en",
  routesList = [],
  parentPath = ""
) => {
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
      const childUri = `${route.paths[lang]}/`;
      if (
        path.startsWith(childUri) ||
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

  return null;
};
