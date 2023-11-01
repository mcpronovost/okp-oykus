import { useTranslation } from "@/plugins/i18n";
import Home from "@/views/Home.astro";
import Profile from "@/views/Profile.astro";
import Error from "@/views/Error.astro";

export const routes = [
  {
    path: "/",
    view: () => (Home),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/profile",
    view: () => (Profile),
    meta: {
      title: "Profile",
    },
  }
];

export const getRoute = (path, lang) => {
  const t = useTranslation(lang);
  const route = routes.find((r) => {
    return t(r.path) === path;
  });
  if (!route) return {view: () => (Error)};
  return route;
};
