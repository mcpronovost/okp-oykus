import type { RouteMapType } from "@/services/utils/types";

export const routesManagement: RouteMapType = {
    management: {
        component: "management/Index",
        paths: {
            en: "management",
            fr: "gestion",
        },
        children: {
            games: {
                component: "management/Games",
                paths: {
                    en: "games",
                    fr: "jeux",
                },
            },
        },
    },
};
