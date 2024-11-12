import { createContext, useState } from "react";
import { getStore, setStore } from "./utils";

interface RouterContextType {
  route: string;
}

export const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [route, setRoute] = useState<string>(
    getStore("router-route", "/") ?? "/"
  );

  return (
    <RouterContext.Provider value={{
      route
    }}>
      {children}
    </RouterContext.Provider>
  );
};
