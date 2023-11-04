import { getLang, getTranslation } from "@/plugins/i18n";
import { getRoute } from "@/plugins/router";

const AppView = () => {
    const appName = "Oykus";

    const lang = getLang(window.location);
    const t = getTranslation(lang);
    const route = getRoute(window.location.pathname, lang);

    window.document.title = `${t(route.meta.title)} - ${appName}`;

    return route.view();
};

export default AppView;
