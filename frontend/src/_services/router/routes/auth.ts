import type { RouteMapType } from "@/services/utils/types";

export const routesAuth: RouteMapType = {
    register: {
        view: "auth/Register",
        paths: {
            en: "register",
            fr: "inscription",
        },
    },
    login: {
        view: "auth/Login",
        paths: {
            en: "login",
            fr: "connexion",
        },
    },
    logout: {
        view: "auth/Logout",
        paths: {
            en: "logout",
            fr: "deconnexion",
        },
    },
};
