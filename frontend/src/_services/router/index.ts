import type { RouteType, RouteMapType, LangType } from "@/services/utils/types";

/**
 * Recursive function to find the route by matching the URI to translations
 */
export const findRoute = (
    uri: string,
    routes: RouteMapType,
    lang: LangType,
): [string, RouteType] | undefined => {
    for (const [key, route] of Object.entries(routes)) {
        // Check for parent route
        if (route.paths[lang] === uri) {
            return [key, route];
        }
        // Check for child routes recursively
        if (route.children) {
            const childUri = `${route.paths[lang]}/`;
            const childRoute = findRoute(uri.replace(childUri, ""), route.children, lang);
            if (childRoute) {
                return childRoute;
            }
        }
    }
    return undefined;
};
