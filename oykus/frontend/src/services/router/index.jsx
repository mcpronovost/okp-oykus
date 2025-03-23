import { createContext, useContext, useRef } from "react";

const RouterContext = createContext(null);

export function RouterProvider({ children, lang = "fr" }) {
  const routerRef = useRef(null);

  return (
    <RouterContext.Provider value={{ }}>
      {children}
    </RouterContext.Provider>
  );
}


export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}
