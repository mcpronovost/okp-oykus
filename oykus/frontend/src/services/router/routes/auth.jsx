export const AUTH_ROUTES = {
  login: {
    component: () => import("@/pages/auth/Login.jsx"),
    paths: {
      en: "login",
      fr: "connexion",
    },
  },
  logout: {
    component: () => import("@/pages/auth/Logout.jsx"),
    paths: {
      en: "logout",
      fr: "deconnexion",
    },
  },
};

export default AUTH_ROUTES;
