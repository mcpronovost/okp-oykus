import type { Lang } from "@/_libs/types/i18n.types";
import { createContext, useState } from "react";
import { defaultLang } from "@/_libs/i18n";
import { getStore, setStore } from "./utils";

interface WebContextType {
  lang: Lang;
  doSetLang: (value: Lang) => void;
  isCoreLeftOpen: boolean;
  doSetCoreLeftOpen: (value: boolean) => void;
}

const WebContext = createContext<WebContextType>({
  lang: defaultLang,
  doSetLang: () => {},
  isCoreLeftOpen: false,
  doSetCoreLeftOpen: () => {},
});

export const WebProvider = ({ children }: { children: React.ReactNode }) => {
  // Lang
  const [lang, setLang] = useState<Lang>(() => {
    return getStore("web-lang", defaultLang) as Lang;
  });

  const doSetLang = (value: Lang) => {
    setStore("web-lang", value);
    setLang(value);
  };

  // Core left
  const [isCoreLeftOpen, setIsCoreLeftOpen] = useState(() => {
    return (getStore("web-core-left-open", "false") === "true")
  });

  const doSetCoreLeftOpen = (value: boolean) => {
    setStore("web-core-left-open", value.toString());
    setIsCoreLeftOpen(value);
  };

  // Return
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