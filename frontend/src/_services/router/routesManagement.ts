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
                props: {
                    view: "list",
                },
                paths: {
                    en: "games",
                    fr: "jeux",
                },
                children: {
                    create: {
                        component: "management/Games",
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
