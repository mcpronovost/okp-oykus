import type { okpLanguage, okpDictionary } from "./types";
import transFR from "./fr.json";
import transEN from "./en.json";

export const locales: okpLanguage[] = ["fr", "en"];

export const defaultLang: okpLanguage = "fr";

export const dico: Record<okpLanguage, okpDictionary> = {
  fr: transFR,
  en: transEN,
};

export const getLang = (): okpLanguage => {
  const [, lang] = window.location.pathname.split("/");
  if (locales.includes(lang)) return lang;
  return defaultLang;
};

export const getTrans = (lang: "fr" | "en" | undefined): string => {
  if (typeof lang == "undefined") lang = getLang(window.location);
  return function t(key) {
    return dico[lang][key] || dico[defaultLang][key] || key;
  };
};
