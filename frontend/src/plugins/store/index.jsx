import { createContext, useState } from "react";

export const setStoreItem = (key, value) => {
  localStorage.setItem(`okp-oykus-${key}`, JSON.stringify(value));
};

export const getStoreItem = (key) => {
  const storedItem = localStorage.getItem(`okp-oykus-${key}`);
  return storedItem ? JSON.parse(storedItem) : null;
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(getStoreItem("sidebar-open"));

  const setStoreSidebarOpen = (value) => {
    setStoreItem("sidebar-open", value);
    setSidebarOpen(value);
  };

  return (
    <StoreContext.Provider value={{
      sidebarOpen,
      setStoreSidebarOpen
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
