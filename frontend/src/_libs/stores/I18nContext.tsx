import type { Lang } from "@/_libs/types/i18n.types";
import { createContext, useState } from "react";
import en from "@/_libs/i18n/locales/en.json";
import fr from "@/_libs/i18n/locales/fr.json";
import { getStore, setStore } from "./utils";

interface I18nContextType {
  defaultLang: Lang;
  locales: Lang[];
  lang: Lang;
  doSetLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = { en, fr };

export const I18nContext = createContext<I18nContextType>(null!!);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultLang = "fr" as Lang;
  const locales = ["en", "fr"] as Lang[];
  const [lang, setLang] = useState<Lang>(getStore("i18n-lang", defaultLang) as Lang);

  const doSetLang = (value: Lang) => {
    setLang(value);
    setStore("i18n-lang", value);
  };

  const getTranslation = (key: string) => {
    return translations[lang]?.[key] || translations[defaultLang][key] || key;
  };

  return (
    <I18nContext.Provider value={{
      defaultLang,
      locales,
      lang,
      doSetLang,
      t: getTranslation,
    }}>
      {children}
    </I18nContext.Provider>
  );
};
