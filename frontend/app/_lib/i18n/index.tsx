import "server-only";
 
const trans = {
  fr: () => import("./fr.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};
 
export const getTrans = async (locale) => {
  return trans[locale]();
};