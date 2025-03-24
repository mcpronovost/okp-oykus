import { createContext, useContext, useEffect, useRef } from "react";
import { loadTranslations } from "./utils";

const TranslationContext = createContext(null);

const TranslationProvider = ({ children, lang = "fr" }) => {
  const translationRef = useRef(null);

  useEffect(() => {
    const translation = loadTranslations(lang);
    translationRef.current = translation;
  }, [lang]);

  const t = (key, count) => {
    const translation = translationRef.current[key];
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
    <TranslationContext.Provider value={{ t, lang }}>
      {children}
    </TranslationContext.Provider>
  );
}

const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}

export { TranslationProvider, useTranslation };
