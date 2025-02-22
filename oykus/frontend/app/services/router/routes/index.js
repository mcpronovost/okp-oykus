const routes = {
  home: {
    component: () => import("@/screens/Home"),
    paths: {
      en: "",
      fr: "",
    },
  },
  devlog: {
    component: () => import("@/screens/Devlog"),
    paths: {
      en: "devlog",
      fr: "devlog",
    },
  },
  settings: {
    component: () => import("@/screens/Settings"),
    paths: {
      en: "settings",
      fr: "parametres",
    },
  },
  error404: {
    component: () => import("@/screens/Error404"),
    paths: {
      en: "404",
      fr: "404",
    },
  },
};

export default routes;
