import FRcore from "./fr/core.json";
import FRroutes from "./fr/routes.json";
import ENcore from "./en/core.json";
import ENroutes from "./en/routes.json";

export const langs = ["fr", "en"];

export const defaultLang = "fr";

export const dico = {
  fr: {
    ...FRcore,
    ...FRroutes,
  },
  en: {
    ...ENcore,
    ...ENroutes
  },
};

export const getLang = () => {
  const [, lang] = window.location.pathname.split("/");
  if (langs.includes(lang)) return lang;
  return defaultLang;
};

export const getTrans = (lang) => {
  if (typeof lang == "undefined") lang = getLang(window.location);
  return function t(key) {
    return dico[lang][key] || dico[defaultLang][key] || key;
  };
};
