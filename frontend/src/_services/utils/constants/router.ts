import type { RouteMapType } from "@/services/utils/types";

export const ROUTES: RouteMapType = {
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
} as const;
