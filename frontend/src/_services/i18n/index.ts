import type { LangType, LangFileType, LangFilesType } from "@/services/utils/types";
import { LANG_DEFAULT } from "@/services/utils/constants";

/**
 * Import translations
 */
const enFiles = import.meta.glob("./locales/**/en.json", { eager: true }) as LangFilesType;
const frFiles = import.meta.glob("./locales/**/fr.json", { eager: true }) as LangFilesType;

/**
 * Pre-compute translations recursively
 */
const locales = {
    en: Object.values(enFiles).reduce(
        (acc: Record<string, string>, module: LangFileType) => ({
            ...acc,
            ...(module.default || module),
        }),
        {},
    ),
    fr: Object.values(frFiles).reduce(
        (acc: Record<string, string>, module: LangFileType) => ({
            ...acc,
            ...(module.default || module),
        }),
        {},
    ),
};

/**
 * Get translation with pluralization
 * @param key - The key to translate
 * @param count - The count for pluralization
 * @param lang - The language to use for translations (defaults to LANG_DEFAULT)
 * @returns The translated string
 */
const t = (key: string, count?: number | undefined, lang: LangType = LANG_DEFAULT) => {
    const translation = locales[lang]?.[key];

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

/**
 * Shared hook to use translation
 * @param lang - The language to use for translations (defaults to LANG_DEFAULT)
 * @returns Object containing translation function
 * @returns {Function} t - Function to get translated string for a key
 * @returns {Function} t.key - Translation key to look up
 * @returns {Function} t.count - Optional count for pluralization
 */
export const getTranslation = (lang: LangType = LANG_DEFAULT) => {
    return {
        t: (key: string, count?: number) => t(key, count, lang),
    };
};
