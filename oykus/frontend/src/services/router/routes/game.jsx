export const GAMES_ROUTES = {
    games: {
      component: () => import("@/pages/game/Home.jsx"),
      paths: {
        en: "g",
        fr: "g",
      },
      children: {
        game: {
          component: () => import("@/pages/game/Home.jsx"),
          paths: {
            en: "{slug}",
            fr: "{slug}",
          },
        },
      },
    },
};
