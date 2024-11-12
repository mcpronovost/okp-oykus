import { createContext, useState } from "react";
import { getStore, setStore } from "./utils";

interface RouterContextType {
  route: string;
  doSetRoute: (value: string) => void;
  doRouteTo: (value: string, push: boolean) => void;
  doRoute: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [route, setRoute] = useState<string>(
    getStore("router-route", "/") ?? "/"
  );

  const doSetRoute = (value: string) => {
    console.log(">>> doSetRoute ", value);
    setRoute(value);
    setStore("router-route", value);
  };

  const doRouteTo = (value: string, push: boolean = true) => {
    doSetRoute(value);
    if (push) {
      window.history.pushState({}, "", value);
    }
  };

  const doRoute = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = new URL(event.currentTarget.href).pathname;
    doRouteTo(href);
  };

  return (
    <RouterContext.Provider value={{
      route,
      doSetRoute,
      doRouteTo,
      doRoute,
    }}>
      {children}
    </RouterContext.Provider>
  );
};
