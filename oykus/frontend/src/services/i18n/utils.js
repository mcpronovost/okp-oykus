/**
 * Get the translation files for a given language
 * @param {string} lang - The language to get the translation files for
 * @returns {Array} - An array of objects with the path and translations
 */
export const getTranslationFiles = (lang = "fr") => {
  const files = import.meta.glob("./locales/**/*.json", { eager: true });
  return Object.entries(files)
    .filter(([path]) => path.endsWith(`${lang}.json`))
    .map(([path, module]) => ({
      path,
      translations: module.default,
    }));
};

/**
 * Load the translations for a given language
 * @param {string} lang - The language to load the translations for
 * @returns {Object} - An object with the translations
 */
export const loadTranslations = async (lang = "fr") => {
  const translations = {};

  try {
    const files = getTranslationFiles(lang);

    // Merge all translation files
    files.forEach(({ translations: fileTranslations }) => {
      Object.assign(translations, fileTranslations);
    });
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}:`, error);
  }

  return translations;
};

export const getDate = (
  value,
  lang = "fr",
  tz = "America/Toronto",
  show = "full"
) => {
  if (lang === "en") lang = "en-CA";
  let d = !!value ? new Date(value) : new Date(new Date().toString());
  let o = {
    timeZone: tz,
    hour12: false,
    year: ["full", "date"].includes(show) ? "numeric" : undefined,
    month: ["full", "date"].includes(show) ? "long" : undefined,
    day: ["full", "date"].includes(show) ? "numeric" : undefined,
    hour: ["full", "time"].includes(show) ? "2-digit" : undefined,
    minute: ["full", "time"].includes(show) ? "2-digit" : undefined,
  };
  return d.toLocaleString(lang, o);
};
