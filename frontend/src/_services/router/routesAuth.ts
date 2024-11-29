import type { RouteMapType } from "@/services/utils/types";

export const routesAuth: RouteMapType = {
    register: {
        component: "auth/Register",
        paths: {
            en: "register",
            fr: "inscription",
        },
    },
    login: {
        component: "auth/Login",
        paths: {
            en: "login",
            fr: "connexion",
        },
    },
    logout: {
        component: "auth/Logout",
        paths: {
            en: "logout",
            fr: "deconnexion",
        },
    },
};
