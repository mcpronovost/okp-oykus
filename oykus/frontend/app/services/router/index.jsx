import { createContext } from "react";
import { useRouter } from "./hooks";

export const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const router = useRouter();

  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  );
};
