import { createContext, useState } from "react";
import { getStore, setStore } from "./utils";

interface AppContextType {
  isCoreLeftOpen: boolean;
  doSetCoreLeftOpen: (value: boolean) => void;
  doToggleCoreLeft: () => void;
}

export const AppContext = createContext<AppContextType>(null!);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCoreLeftOpen, setIsCoreLeftOpen] = useState<boolean>(
    getStore("app-coreleft-open", "false") === "true"
  );

  const doSetCoreLeftOpen = (value: boolean) => {
    setIsCoreLeftOpen(value);
    setStore("app-coreleft-open", value ? "true" : "false");
  };

  const doToggleCoreLeft = () => {
    doSetCoreLeftOpen(!isCoreLeftOpen);
  };

  return (
    <AppContext.Provider value={{
      isCoreLeftOpen,
      doSetCoreLeftOpen,
      doToggleCoreLeft
    }}>
      {children}
    </AppContext.Provider>
  );
};
