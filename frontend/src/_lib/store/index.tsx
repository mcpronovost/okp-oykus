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
  const [user, setStoreUser] = useState(getStoreItem("user") || null);
  const [toggleNavbar, setStoreToggleNavbar] = useState(
    !!getStoreItem("toggle-navbar")
  );
  const [toggleSidebar, setStoreToggleSidebar] = useState(
    !!getStoreItem("toggle-sidebar")
  );

  const setUser = (value) => {
    setStoreUser(user => ({
      ...user,
      ...value,
      updated: Date.now()
    }));
    setStoreItem("user", user);
  };

  const delUser = () => {
    deleteStoreItem("user");
    setStoreUser(null);
  };

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
        user,
        setUser,
        delUser,
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
