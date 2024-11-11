import type { Lang } from "@/_libs/types/i18n.types";
import { createContext, useState } from "react";

interface WebContextType {
  lang: Lang;
  doSetLang: (lang: Lang) => void;
  isCoreLeftOpen: boolean;
  doSetCoreLeftOpen: (value: boolean) => void;
  doToggleCoreLeft: () => void;
}

export const WebContext = createContext<WebContextType>(null!);

const WebProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const [isCoreLeftOpen, setIsCoreLeftOpen] = useState<boolean>(false);

  const doSetLang = (value: Lang) => {
    setLang(value);
  };

  const doSetCoreLeftOpen = (value: boolean) => {
    setIsCoreLeftOpen(value);
  };

  const doToggleCoreLeft = () => {
    setIsCoreLeftOpen(!isCoreLeftOpen);
  };

  return (
    <WebContext.Provider value={{
      lang,
      doSetLang,
      isCoreLeftOpen,
      doSetCoreLeftOpen,
      doToggleCoreLeft
    }}>
      {children}
    </WebContext.Provider>
  );
};

export default WebProvider;
