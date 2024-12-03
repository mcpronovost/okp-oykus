import type { RouteType, RouteMapType, LangType } from "@/services/utils/types";
import { LANG_DEFAULT } from "@/services/utils/constants";
import { routesAuth } from "./routes/auth";
import { routesManagement } from "./routes/management";

/**
 * Global Routes
 */
export const routes: RouteMapType = {
    home: {
        view: "Home",
        paths: {
            en: "",
            fr: "",
        },
    },
    about: {
        view: "About",
        paths: {
            en: "about",
            fr: "a-propos",
        },
        children: {
            contact: {
                view: "Contact",
                paths: {
                    en: "contact",
                    fr: "contact",
                },
                children: {
                    test: {
                        view: "common/Test",
                        paths: {
                            en: "test",
                            fr: "testfr",
                        },
                    },
                },
            },
        },
    },
    ...routesAuth,
    ...routesManagement,
    settings: {
        view: "Settings",
        paths: {
            en: "settings",
            fr: "parametres",
        },
    },
};

/**
 * Recursively finds a route by matching the URI to translations in the route map
 * @param uri - The URI path to match against route translations
 * @param lang - The language code to use for matching (e.g., "en" or "fr")
 * @param routesList - Optional route map to search through. Defaults to global routes if not provided
 * @param parentPath - Optional dot-notation path of parent routes. Used internally for recursion
 * @returns A tuple containing [fullRoutePath, routeObject] if found, undefined otherwise
 */
export const findRoute = (
    uri: string,
    lang: LangType,
    routesList?: RouteMapType | undefined,
    parentPath: string = "",
): [string, RouteType] | undefined => {
    if (!routesList) routesList = routes;
    for (const [key, route] of Object.entries(routesList)) {
        // Check for parent route
        const fullPath = parentPath ? `${parentPath}.${key}` : key;
        if (route.paths[lang] === uri) {
            return [fullPath, route];
        }
        // Check for child routes recursively
        if (route.children) {
            const childUri = `${route.paths[lang]}/`;
            // Only recurse if the URI starts with the parent path
            if (uri.startsWith(childUri)) {
                const nextParentPath = parentPath ? `${parentPath}.${key}` : key;
                const childRoute = findRoute(
                    uri.replace(childUri, ""),
                    lang,
                    route.children,
                    nextParentPath,
                );
                if (childRoute) {
                    return childRoute;
                }
            }
        }
    }
    return undefined;
};

/**
 * Translates a route URI from one language to another
 * @param uri - The current URI path
 * @param fromLang - The language code of the current URI
 * @param toLang - The target language code to translate the URI to
 * @returns The translated URI path in the new language, or the original URI if no translation is found
 */
export const findLocaleRoute = (uri: string, fromLang: LangType, toLang: LangType, params?: Record<string, string>): string => {
    // Find the current route based on the URI and current language
    const currentRoute = findRoute(uri, fromLang);
    if (!currentRoute) return uri;

    const [routePath, _] = currentRoute;

    // Split the route path to handle nested routes
    const routeParts = routePath.split(".");
    let routesList: RouteMapType = routes;
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

    return `/${toLang}/${toPath}`;
};

export const getRoute = (toLang: LangType = LANG_DEFAULT) => {
    return {
        r: (uri: string, params?: Record<string, string>) => findLocaleRoute(uri, "en", toLang, params),
    };
};
