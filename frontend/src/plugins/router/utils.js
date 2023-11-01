import Profile from "@/views/Profile.astro";
import Error from "@/views/Error.astro";

export const routes = [
    {
        path: "/",
        name: "home",
        view: () => (Profile),
        meta: {
            title: "Home",
        },
    },
    {
        path: "/profil",
        name: "profile",
        view: () => (Profile),
        meta: {
            title: "Home",
        },
    }
];

export const getRoute = (path) => {
  const route = routes.find((r) => r.path == path);
  if (!route) return () => (Error);
  return route.view;
};

export const getRouteName = () => {
  return router.currentRoute.name;
};

export const getRouteParams = () => {
  return router.currentRoute.params;
};

export const getRouteQuery = () => {
  return router.currentRoute.query;
};

export const getRouteFullPath = () => {
  return router.currentRoute.fullPath;
};

export const getRoutePath = () => {
  return router.currentRoute.path;
};

export const getRouteHash = () => {
  return router.currentRoute.hash;
};

export const getRouteMeta = () => {
  return router.currentRoute.meta;
};
