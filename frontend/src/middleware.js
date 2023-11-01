import { languages, defaultLang } from "@/plugins/i18n";

export function onRequest (context, next) {
    // ===---
    const [, currentLang] = context.url.pathname.split("/");
    if (currentLang && !(languages.includes(currentLang))) {
        return context.redirect(`${context.url.origin}/${defaultLang}/`, 303);
    };
    // ===---
    context.locals.api = `http://${import.meta.env.BACKEND_IP}:8000`;
    // ===---
    return next();
};
