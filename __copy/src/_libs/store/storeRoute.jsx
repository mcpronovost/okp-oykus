import { createContext, useEffect, useState } from "react";
import { getStore, setStore } from "./utils";

// Create context with a proper initial state
const initialState = {
  route: getStore("web-route", "forum"),
  doSetRoute: () => {},
  doRoute: () => {},
};

const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  // Route
  const [route, setRoute] = useState(initialState.route);

  const doSetRoute = (value) => {
    setStore("web-route", value);
    setRoute(value || "forum");
  };

  const doRoute = (event) => {
    event.preventDefault();
    const href = event.currentTarget.href;
    const value = href.split(/\/g\/[\w-]+\//)[1] || "forum";
    // window.history.pushState({}, "", href);
    console.log("value :: ", value);
    doSetRoute(value);
  };

  if (!isClient) return null;

  // Return
  return (
    <RouteContext.Provider
      value={{
        route,
        doSetRoute,
        doRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export default RouteContext;