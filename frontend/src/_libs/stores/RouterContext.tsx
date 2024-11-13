import { createContext, useState, useEffect } from "react";
import { getStore, setStore } from "./utils";

interface RouterContextType {
  route: string;
  doSetRoute: (value: string) => void;
  doRouteTo: (value: string, push: boolean) => void;
  doRoute: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  gameSlug: string | null;
}

export const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [route, setRoute] = useState<string>(
    getStore("router-route", "/") ?? "/"
  );
  const [gameSlug, setGameSlug] = useState<string | null>(
    route.match(/^\/g\/([\w-]+)/)?.[1] || null
  );

  const doSetRoute = (value: string) => {
    if (value !== route) {
      setRoute(value);
      setStore("router-route", value);
    }
  };

  const doRouteTo = (value: string, push: boolean = true) => {
    if (value !== route) {
      doSetRoute(value);
      if (push) {
        window.history.pushState({}, "", value);
      }
    }
  };

  const doRoute = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = new URL(event.currentTarget.href).pathname;
    doRouteTo(href);
  };

  useEffect(() => {
    setGameSlug(route.match(/^\/g\/([\w-]+)/)?.[1] || null);
  }, [route]);

  return (
    <RouterContext.Provider value={{
      route,
      doSetRoute,
      doRouteTo,
      doRoute,
      gameSlug
    }}>
      {children}
    </RouterContext.Provider>
  );
};
