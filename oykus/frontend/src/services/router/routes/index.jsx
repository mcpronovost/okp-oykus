const ROUTES = {
    home: {
      component: () => import("@/pages/Home.jsx"),
      paths: {
        en: "",
        fr: "",
      }
    },
    error404: {
      component: () => import("@/pages/Error404.jsx"),
      paths: {
        en: "404",
        fr: "404",
      }
    },
};

export default ROUTES;
