import type { okpRoute } from "./types";
import { createContext, useEffect, useState } from "react";
import { getLang, getTrans } from "@/_lib/i18n";
import HomeView, { metaHome } from "@/views/Home";
import { routesAuth } from "./routesAuth";
import Error404View, { metaError404 } from "@/views/errors/Error404";

export const routes: okpRoute[] = [
  {
    uri: "",
    view: HomeView,
    meta: metaHome,
  },
  ...routesAuth,
  {
    uri: "/error",
    view: Error404View,
    meta: metaError404,
  },
];

export const getRoute = (path: string, lang: string): okpRoute => {
  const t = getTrans(lang);
  if (path == "/") path = "";
  const route = routes.find((r) => {
    if (path.startsWith(`/${lang}`)) {
      return `/${lang}${t(r.uri)}` === path;
    } else {
      return `${t(r.uri)}` === path;
    }
  });
  if (!route)
    return {
      view: Error404View,
      meta: metaError404,
    };
  return route;
};

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const lang = getLang();
  const t = getTrans(lang);
  const appName = "Oykus";
  const [route, setRoute] = useState(getRoute(window.location.pathname, lang));

  const goRoute = (path) => {
    if (!path) path = "/";
    setRoute(getRoute(path, lang));
    history.pushState({}, "", path);
  };

  const isCurrentRoute = (path: string): boolean => {
    return window.location.pathname === path;
  };

  /* ===--- effects and listeners ---=== */

  useEffect(() => {
    const metaTitle = `${t(route.meta.title)} - ${appName}`;
    const metaDescription =
      t(route.meta.description) || t("Oykus is a project.");

    window.document.documentElement.lang = lang;
    window.document.title = metaTitle;
  }, [route]);

  window.onpopstate = () => {
    setRoute(getRoute(window.location.pathname, lang));
  };

  /* ===--- render ---=== */

  return (
    <RouterContext.Provider
      value={{
        route,
        goRoute,
        isCurrentRoute,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterContext;
