import type { RouteType, RouteMapType, LangType } from "@/services/utils/types";
import { routesAuth } from "./routesAuth";

/**
 * Routes
 */
export const routes: RouteMapType = {
    home: {
        component: "Home",
        paths: {
            en: "",
            fr: "",
        },
    },
    about: {
        component: "About",
        paths: {
            en: "about",
            fr: "a-propos",
        },
        children: {
            contact: {
                component: "Contact",
                paths: {
                    en: "contact",
                    fr: "contact",
                },
                children: {
                    test: {
                        component: "common/Test",
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
    settings: {
        component: "Settings",
        paths: {
            en: "settings",
            fr: "parametres",
        },
    },
};

/**
 * Recursive function to find the route by matching the URI to translations
 */
export const findRoute = (
    uri: string,
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
            // Only recurse if the URI starts with the parent path
            if (uri.startsWith(childUri)) {
                const childRoute = findRoute(uri.replace(childUri, ""), lang);
                if (childRoute) {
                    return childRoute;
                }
            }
        }
    }
    return undefined;
};
