import { GAMES_ROUTES } from "./game";

const ROUTES = {
    home: {
      component: () => import("@/pages/Home.jsx"),
      paths: {
        en: "",
        fr: "",
      }
    },
    login: {
      component: () => import("@/pages/auth/Login.jsx"),
      paths: {
        en: "login",
        fr: "connexion",
      }
    },
    logout: {
      component: () => import("@/pages/auth/Logout.jsx"),
      paths: {
        en: "logout",
        fr: "deconnexion",
      }
    },
    error404: {
      component: () => import("@/pages/Error404.jsx"),
      paths: {
        en: "404",
        fr: "404",
      }
    },
    ...GAMES_ROUTES,
};

export default ROUTES;
