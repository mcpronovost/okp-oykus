import { getTranslation } from "@/plugins/i18n";
import HomeView from "@/views/Home.jsx";
import ErrorView from "@/views/Error.jsx";

export const routes = [
  {
    uri: "/",
    view: HomeView,
    meta: {
      title: "Home",
    }
  },
  {
    uri: "/error/",
    view: ErrorView,
    meta: {
      title: "Error",
    }
  }
];

export const getRoute = (path, lang) => {
  if (path.substr(-1) != "/") path += "/";
  const t = getTranslation(lang);
  const route = routes.find((r) => {
    return `/${lang}${t(r.uri)}` === path;
  });
  if (!route) return {
    view: ErrorView,
    meta: {
      title: "Page Not Found",
    }
  };
  return route;
};
