import { useEffect } from "react";
import { languages, getLang, getTranslation } from "@/plugins/i18n";
import { getRoute } from "@/plugins/router";

const AppView = () => {
    const appName = "Oykus";

    const lang = getLang(window.location);
    const t = getTranslation(lang);
    const route = getRoute(window.location.pathname, lang);

    window.document.title = `${t(route.meta.title)} - ${appName}`;

    useEffect(() => {
        const [, pathLang] = window.location.pathname.split("/");
        if (!pathLang || !languages.includes(pathLang)) {
            window.location.pathname = `/${lang}${window.location.pathname}`;
        }
    }, []);

    return route.view();
};

export default AppView;
