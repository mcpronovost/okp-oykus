import { useEffect } from "react";
import { languages, getLang, getTranslation } from "@/plugins/i18n";
import { getRoute } from "@/plugins/router";
import { StoreProvider } from "@/plugins/store";

const AppView = () => {
  const appName = "Oykus";

  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const route = getRoute(window.location.pathname, lang);

  const metaTitle = `${t(route.meta.title)} - ${appName}`;
  const metaDescription = t(route.meta.description) || t("Oykus is a project.");

  useEffect(() => {
    const [, pathLang] = window.location.pathname.split("/");
    if (!pathLang || !languages.includes(pathLang)) {
      window.location.pathname = `/${lang}${window.location.pathname}`;
    }

    window.document.documentElement.lang = lang;
    window.document.title = metaTitle;
    window.document.documentElement.querySelector(
      "meta[property='og:title']"
    ).content = metaTitle;
    window.document.documentElement.querySelector(
      "meta[name='twitter:title']"
    ).content = metaTitle;
    window.document.documentElement.querySelector(
      "meta[name='description']"
    ).content = metaDescription;
    window.document.documentElement.querySelector(
      "meta[name='twitter:description']"
    ).content = metaDescription;
  }, [lang, metaTitle, metaDescription]);

  return (
    <>
      <StoreProvider>
        <route.view />
      </StoreProvider>
    </>
  );
};

export default AppView;
