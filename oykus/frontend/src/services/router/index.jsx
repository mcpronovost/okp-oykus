import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRoute, getLocalizedPath } from "./utils";

const RouterContext = createContext(null);

const RouterProvider = ({ children, lang = "fr", routePath = "" }) => {
  const [routeName, setRouteName] = useState(routePath);
  const [route, setRoute] = useState(() => getRoute(routePath, lang)[1]);

  const doNavigate = useCallback(
    (toRouteName, toLang = lang) => {
      return getLocalizedPath(toRouteName, toLang);
    },
    [lang]
  );

  useEffect(() => {
    setRouteName(routePath);
    setRoute(getRoute(routePath, lang)[1]);
  }, [routePath, lang]);

  return (
    <RouterContext.Provider value={{ lang, routeName, route, r: doNavigate }}>
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

export { RouterContext, RouterProvider, useRouter };
export { getRoute };
