const ROUTES = {
  home: {
    component: () => import("@/pages/Home.jsx"),
    paths: {
      en: "",
      fr: "",
    },
  },
  about: {
    component: () => import("@/pages/forum/Topic.jsx"),
    paths: {
      en: "topic",
      fr: "topic",
    },
  },
};

export default ROUTES;
