import type { Lang } from "@/types/i18n.types";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const translations: Record<Lang, Record<string, string>> = { en, fr };

const defaultLang = "en";

export const getTranslation = (lang: Lang) => {
  return function t(key: string) {
    return translations[lang]?.[key] || translations[defaultLang][key] || key;
  };
};