const routes = {
  home: {
    component: () => import("@/screens/Home"),
    paths: {
      en: "",
      fr: "",
    },
  },
  devlog: {
    paths: {
      en: "devlog",
      fr: "devlog",
    },
  },
  settings: {
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
