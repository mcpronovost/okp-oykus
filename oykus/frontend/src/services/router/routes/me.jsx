export const ME_ROUTES = {
  me_characters: {
    component: () => import("@/pages/me/Characters.jsx"),
    paths: {
      en: "m/characters",
      fr: "m/personnages",
    },
  },
  me_games: {
    component: () => import("@/pages/me/Games.jsx"),
    paths: {
      en: "m/games",
      fr: "m/jeux",
    },
  },
};
