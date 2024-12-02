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
                component: "management/Games/Index",
                props: {
                    view: "list",
                },
                paths: {
                    en: "games",
                    fr: "jeux",
                },
                children: {
                    create: {
                        component: "management/Games/Index",
                        props: {
                            view: "create",
                        },
                        paths: {
                            en: "create",
                            fr: "creer",
                        },
                    },
                },
            },
        },
    },
};
