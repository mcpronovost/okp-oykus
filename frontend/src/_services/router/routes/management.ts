import type { RouteMapType } from "@/services/utils/types";

export const routesManagement: RouteMapType = {
    management: {
        view: "management/Index",
        paths: {
            en: "management",
            fr: "gestion",
        },
        children: {
            games: {
                view: "management/Games/List",
                paths: {
                    en: "games",
                    fr: "jeux",
                },
                children: {
                    create: {
                        view: "management/Games/Create",
                        paths: {
                            en: "create",
                            fr: "creer",
                        },
                    },
                    edit: {
                        view: "management/Games/Edit",
                        paths: {
                            en: "{slug}/edit",
                            fr: "{slug}/modifier",
                        },
                    },
                    view: {
                        view: "management/Games/View",
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
