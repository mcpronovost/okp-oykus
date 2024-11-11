import { createContext, useState, useEffect } from "react";
import { defaultLang } from "@/_libs/i18n";
import { getStore, setStore } from "./utils";

const WebContext = createContext();

export const WebProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [lang, setLang] = useState(defaultLang);
  const [isCoreLeftOpen, setIsCoreLeftOpen] = useState(false);

  // Initialize state after component mounts
  useEffect(() => {
    const storedLang = getStore("web-lang", defaultLang);
    const storedCoreLeftOpen = getStore("web-core-left-open", "false") === "true";
    
    setLang(storedLang);
    setIsCoreLeftOpen(storedCoreLeftOpen);
    setIsClient(true);
  }, []);

  const doSetLang = (value) => {
    setStore("web-lang", value);
    setLang(value);
  };

  const doSetCoreLeftOpen = (value) => {
    setStore("web-core-left-open", value.toString());
    setIsCoreLeftOpen(value);
  };

  if (!isClient) return null;

  return (
    <WebContext.Provider
      value={{
        lang,
        doSetLang,
        isCoreLeftOpen,
        doSetCoreLeftOpen
      }}
    >
      {children}
    </WebContext.Provider>
  );
};

export default WebContext;