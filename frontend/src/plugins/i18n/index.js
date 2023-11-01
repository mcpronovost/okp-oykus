import msgFr from "@/plugins/i18n/fr.json";
import msgEn from "@/plugins/i18n/en.json";

export const languages = [
    "fr", "en"
]

export const defaultLang = "fr";

export const messages = {
    fr: msgFr,
    en: msgEn
};

export const getLang = (url) => {
    const [, lang] = url.pathname.split("/");
    if (languages.includes(lang)) return lang;
    return defaultLang;
};

export const useTranslation = (lang) => {
    return function t(key) {
        return messages[lang][key] || messages[defaultLang][key] || key;
    };
};

export const formatDate = (date, lang) => {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    if (!date) return new Date().toLocaleDateString(lang, options);
    return new Date(date).toLocaleDateString(lang, options);
};
