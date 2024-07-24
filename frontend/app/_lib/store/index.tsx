import { createContext, useContext, useState } from "react";
import { setCookie, getCookie } from "@/app/_lib/client";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(
    getCookie("okp-toggle-sidebar") || false
  );

  const setStoreToggleSidebar = (value) => {
    setCookie("okp-toggle-sidebar", value, 30);
    setToggleSidebar(value);
  };

  return (
    <StoreContext.Provider
      value={{
        toggleSidebar,
        setStoreToggleSidebar,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
