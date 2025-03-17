import { createContext, useEffect, useState } from "react";
import { loadTranslations, getDate } from "./utils";

const I18nContext = createContext({
  t: () => {},
});

function I18nProvider({ children }) {
  const lang = window.document.documentElement.lang;
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

  const d = (value, toLang = lang, tz = "America/Toronto", show = "full") => {
    return getDate(value, toLang, tz, show);
  };

  return (
    <I18nContext.Provider value={{ t, d }}>{children}</I18nContext.Provider>
  );
}

export default I18nProvider;
export { I18nContext };
