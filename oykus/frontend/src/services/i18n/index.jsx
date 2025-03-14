import { createContext, useContext, useEffect, useState } from "react";
import { loadTranslations } from "./utils";

const I18nContext = createContext();

function I18nProvider({ children }) {
  const lang = "fr";
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    loadTranslations(lang).then(newTranslations => {
      setTranslations(newTranslations);
    });
  }, [lang]);

  const t = (
    key,
    count,
  ) => {
    const translation = translations[key];
    if (typeof translation === "object" && count !== undefined) {
      const rules = new Intl.PluralRules(lang);
      const pluralForm = rules.select(count);
      return translation[pluralForm] || translation["other"];
    }
  
    if (typeof translation === "object") {
      return translation["other"];
    }
  
    if (typeof translation === "string") {
      return translation;
    }
  
    // eslint-disable-next-line no-console
    console.warn(`Translation not found for key: "${key}".`);
    return key;
  };

  return (
    <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>
  );
}

function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return context;
}

export { I18nProvider, useI18n };
