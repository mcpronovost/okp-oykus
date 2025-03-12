import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getLangAndPath, getRoute, getLocalizedPath } from "./utils";

const RouterContext = createContext();

const RouterProvider = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);
  const [lang, setLang] = useState(getLangAndPath(path).langCode);
  const [routeName, setRouteName] = useState(getLangAndPath(path).pathPart);
  const [route, setRoute] = useState(getRoute(routeName, lang)[1]);

  const updateRouter = useCallback((newPath) => {
    const { langCode, pathPart } = getLangAndPath(newPath);
    setPath(newPath);
    if (langCode !== lang) {
      setLang(langCode);
    }
    setRouteName(pathPart);
    setRoute(getRoute(pathPart, langCode)[1]);
  }, []);

  const doNavigate = useCallback((newPath, toLang = lang) => {
    const localizedPath = getLocalizedPath(newPath, toLang);
    window.history.pushState({}, "", localizedPath);
    updateRouter(localizedPath);
  }, [updateRouter]);

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

  return (
    <RouterContext.Provider
      value={{
        path,
        lang,
        routeName,
        route,
        r: doNavigate,
        getLangAndPath,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};

export default RouterProvider;
export { useRouter };
