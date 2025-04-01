export const AUTH_ROUTES = {
  login: {
    component: () => import("@/pages/auth/Login"),
    paths: {
      en: "login",
      fr: "connexion",
    },
  },
  logout: {
    component: () => import("@/pages/auth/Logout"),
    paths: {
      en: "logout",
      fr: "deconnexion",
    },
  },
  auth: {
    component: () => import("@/pages/Home"),
    paths: {
      en: "a",
      fr: "a",
    },
    children: {
      characters: {
        component: () => import("@/pages/auth/Characters"),
        paths: {
          en: "characters",
          fr: "personnages",
        },
      },
      games: {
        component: () => import("@/pages/auth/Games"),
        paths: {
          en: "games",
          fr: "jeux",
        },
        children: {
          edit: {
            component: () => import("@/pages/auth/Games/Edit"),
            paths: {
              en: "{game_id}/edit",
              fr: "{game_id}/modifier",
            },
          },
          delete: {
            component: () => import("@/pages/auth/Games/Delete"),
            paths: {
              en: "{game_id}/deletion",
              fr: "{game_id}/suppression",
            },
          },
        },
      },
    },
  },
};

export default AUTH_ROUTES;
