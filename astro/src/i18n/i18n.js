import en from "./locales/en.json";
import fr from "./locales/fr.json";

const translations = { en, fr };

const defaultLang = "en";

export const getTranslation = (lang) => {
  return function t(key) {
    return translations[lang]?.[key] || translations[defaultLang][key] || key;
  };
};
