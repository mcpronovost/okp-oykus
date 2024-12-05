import type { RouteMapType } from "@/services/utils/types";

export const routesManagement: RouteMapType = {
    management: {
        view: "management/Index",
        paths: {
            en: "management",
            fr: "gestion",
        },
        auth: true,
        children: {
            games: {
                view: "management/Games/List",
                paths: {
                    en: "games",
                    fr: "jeux",
                },
                auth: true,
                children: {
                    create: {
                        view: "management/Games/Create",
                        paths: {
                            en: "create",
                            fr: "creer",
                        },
                        auth: true,
                    },
                    edit: {
                        view: "management/Games/Edit",
                        paths: {
                            en: "{slug}/edit",
                            fr: "{slug}/modifier",
                        },
                        auth: true,
                    },
                    view: {
                        view: "management/Games/View",
                        paths: {
                            en: "{slug}/view",
                            fr: "{slug}/voir",
                        },
                        auth: true,
                    },
                },
            },
        },
    },
};
