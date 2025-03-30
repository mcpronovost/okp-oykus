import { AUTH_ROUTES } from "./auth";
import { GAMES_ROUTES } from "./game";

const ROUTES = {
  home: {
    component: () => import("@/pages/Home.jsx"),
    paths: {
      en: "",
      fr: "",
    },
  },
  ...AUTH_ROUTES,
  ...GAMES_ROUTES,
  error404: {
    component: () => import("@/pages/Error404.jsx"),
    paths: {
      en: "404",
      fr: "404",
    },
  },
};

export default ROUTES;
