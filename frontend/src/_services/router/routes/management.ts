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
                component: "management/Games/List",
                paths: {
                    en: "games",
                    fr: "jeux",
                },
                children: {
                    create: {
                        component: "management/Games/Create",
                        paths: {
                            en: "{slug}/create",
                            fr: "{slug}/creer",
                        },
                    },
                    edit: {
                        component: "management/Games/Edit",
                        paths: {
                            en: "{slug}/edit",
                            fr: "{slug}/modifier",
                        },
                    },
                    view: {
                        component: "management/Games/View",
                        paths: {
                            en: "{slug}/view",
                            fr: "{slug}/voir",
                        },
                    },
                },
            },
        },
    },
};
