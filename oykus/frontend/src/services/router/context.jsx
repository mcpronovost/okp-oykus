import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { enforceTrailingSlash, getLangAndPath, getRoute, getLocalizedPath } from "./utils";

const RouterContext = createContext({
  path: "/fr/",
  lang: "fr",
  routeName: "home",
  route: {
    component: () => import("@/pages/Home"),
    name: "home",
    path: "/fr/home",
  },
  r: () => {},
  getLangAndPath: () => {},
});

function RouterProvider({ children }) {
  const [path, setPath] = useState(() => {
    const currentPath = window.location.pathname;
    return enforceTrailingSlash(currentPath);
  });
  const [lang, setLang] = useState(() => getLangAndPath(path).langCode);
  const [routeName, setRouteName] = useState(() => getLangAndPath(path).pathPart)
  const [route, setRoute] = useState(() => getRoute(routeName, lang)[1]);

  const updateRouter = useCallback((newPath) => {
    const pathWithSlash = enforceTrailingSlash(newPath);
    const { langCode, pathPart } = getLangAndPath(pathWithSlash);
    setPath(pathWithSlash);
    if (langCode !== lang) {
      setLang(langCode);
    }
    setRouteName(pathPart);
    setRoute(getRoute(pathPart, langCode)[1]);
  }, [lang]);

  const doNavigate = useCallback((newPath, toLang = lang) => {
    const localizedPath = getLocalizedPath(newPath, toLang);
    window.history.pushState({}, "", localizedPath);
    updateRouter(localizedPath);
  }, [updateRouter, lang]);

  useEffect(() => {
    const handlePopState = () => {
      updateRouter(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [updateRouter]);

  useEffect(() => {
    const documentLang = window.document.documentElement.lang;
    if (documentLang !== lang) {
      window.document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo(() => ({
    path,
    lang,
    routeName,
    route,
    r: doNavigate,
    getLangAndPath,
  }), [path, lang, routeName, route, doNavigate]);

  return (
    <RouterContext.Provider
      value={value}
    >
      {children}
    </RouterContext.Provider>
  );
}

export default RouterProvider;
export { RouterContext };
