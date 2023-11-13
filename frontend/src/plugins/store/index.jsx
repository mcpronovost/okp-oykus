import { createContext, useState } from "react";
import { Buffer } from "buffer";

export const setStoreItem = (key, value) => {
  localStorage.setItem(`okp-oykus-${key}`, Buffer.from(JSON.stringify(value)).toString("base64"));
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
  const [user, setUser] = useState(getStoreItem("user") || null);
  const [sidebarOpen, setSidebarOpen] = useState(getStoreItem("sidebar-open") || false);

  const setStoreUser = (value) => {
    setStoreItem("user", value);
    setUser(user => ({
      ...user,
      ...value
    }));
  };

  const delStoreUser = () => {
    deleteStoreItem("user");
    setUser(null);
  };

  const setStoreSidebarOpen = (value) => {
    setStoreItem("sidebar-open", value);
    setSidebarOpen(value);
  };

  return (
    <StoreContext.Provider value={{
      user,
      setStoreUser,
      delStoreUser,
      sidebarOpen,
      setStoreSidebarOpen
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
