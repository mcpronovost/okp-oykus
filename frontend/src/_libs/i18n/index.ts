import type { Lang } from "@/_libs/types/i18n.types";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const translations: Record<Lang, Record<string, string>> = { en, fr };

export const defaultLang = "fr";

export const locales = ["en", "fr"];

export const getTranslation = (lang: Lang) => {
  return function t (key: string) {
    return translations[lang]?.[key] || translations[defaultLang][key] || key;
  };
};
