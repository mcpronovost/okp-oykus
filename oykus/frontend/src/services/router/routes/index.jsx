import { lazy } from "react";

const ROUTES = {
    home: {
      component: lazy(() => import("@/pages/Home.jsx")),
      paths: {
        en: "",
        fr: "",
      }
    },
    login: {
      component: lazy(() => import("@/pages/auth/Login.jsx")),
      paths: {
        en: "login",
        fr: "connexion",
      }
    },
    logout: {
      component: lazy(() => import("@/pages/auth/Logout.jsx")),
      paths: {
        en: "logout",
        fr: "deconnexion",
      }
    },
    error404: {
      component: lazy(() => import("@/pages/Error404.jsx")),
      paths: {
        en: "404",
        fr: "404",
      }
    },
};

export default ROUTES;
