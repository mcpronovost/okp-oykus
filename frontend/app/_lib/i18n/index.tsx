import type { okpLocale, okpTranslation } from "./types";
 
const trans = {
  fr: () => import("./fr.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};
 
export const getTrans = async (locale: okpLocale): Promise<okpTranslation> => {
  return trans[locale]();
};