import { createContext, useState } from "react";
import { Buffer } from "buffer";

export const setStoreItem = (key, value) => {
  localStorage.setItem(
    `okp-oykus-${key}`,
    Buffer.from(JSON.stringify(value)).toString("base64")
  );
};

export const getStoreItem = (key) => {
  const storedItem = localStorage.getItem(`okp-oykus-${key}`);
  return storedItem ? JSON.parse(Buffer.from(storedItem, "base64")) : null;
};

export const deleteStoreItem = (key) => {
  localStorage.removeItem(`okp-oykus-${key}`);
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [toggleNavbar, setStoreToggleNavbar] = useState(
    getStoreItem("toggle-navbar") || false
  );
  const [toggleSidebar, setStoreToggleSidebar] = useState(
    getStoreItem("toggle-sidebar") || false
  );

  const setToggleNavbar = (value) => {
    setStoreItem("toggle-navbar", value);
    setStoreToggleNavbar(value);
  };

  const setToggleSidebar = (value) => {
    setStoreItem("toggle-sidebar", value);
    setStoreToggleSidebar(value);
  };

  return (
    <StoreContext.Provider
      value={{
        toggleNavbar,
        setToggleNavbar,
        toggleSidebar,
        setToggleSidebar,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
