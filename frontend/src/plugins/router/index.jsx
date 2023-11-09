import { createContext, useEffect, useState } from "react";
import { getLang, getTranslation } from "@/plugins/i18n";
import HomeView from "@/views/Home.jsx";
import RankingsView from "@/views/Rankings.jsx";
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
    uri: "/rankings/",
    view: RankingsView,
    meta: {
      title: "Rankings",
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

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const appName = "Oykus";
  const [route, setRoute] = useState(getRoute(window.location.pathname, "fr"));

  const goRoute = (path) => {
    const [, language] = path.split("/");
    setRoute(getRoute(path, language));
    history.pushState({}, "", path);
  };

  const isCurrentRoute = (path) => {
    return window.location.pathname === path;
  };

  /* ===--- effects and listeners ---=== */

  useEffect(() => {
    const metaTitle = `${t(route.meta.title)} - ${appName}`;
    const metaDescription = t(route.meta.description) || t("Oykus is a project.");

    window.document.documentElement.lang = lang;
    window.document.title = metaTitle;
    window.document.documentElement.querySelector(
      "meta[property='og:title']"
    ).content = metaTitle;
    window.document.documentElement.querySelector(
      "meta[name='twitter:title']"
    ).content = metaTitle;
    window.document.documentElement.querySelector(
      "meta[name='description']"
    ).content = metaDescription;
    window.document.documentElement.querySelector(
      "meta[name='twitter:description']"
    ).content = metaDescription;
  }, [route]);

  window.onpopstate = () => {
    setRoute(getRoute(window.location.pathname, lang));
  };

  /* ===--- render ---=== */

  return (
    <RouterContext.Provider value={{
      route,
      goRoute,
      isCurrentRoute
    }}>
      { children }
    </RouterContext.Provider>
  );
};

export default RouterContext;
