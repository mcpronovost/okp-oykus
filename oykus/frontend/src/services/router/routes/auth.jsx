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
  auth: {
    component: () => import("@/pages/Home.jsx"),
    paths: {
      en: "a",
      fr: "a",
    },
    children: {
      characters: {
        component: () => import("@/pages/auth/Characters.jsx"),
        paths: {
          en: "characters",
          fr: "personnages",
        },
      },
      games: {
        component: () => import("@/pages/auth/Games.jsx"),
        paths: {
          en: "games",
          fr: "jeux",
        },
      },
    },
  },
};

export default AUTH_ROUTES;
