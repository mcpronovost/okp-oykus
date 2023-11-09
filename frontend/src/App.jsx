import { useContext } from "react";
import { languages, getLang } from "@/plugins/i18n";
import RouterContext from "@/plugins/router";

const AppView = () => {
  const lang = getLang(window.location);
  const { route } = useContext(RouterContext);

  const [, pathLang] = window.location.pathname.split("/");
  if (!pathLang || !languages.includes(pathLang)) {
    window.location.pathname = `/${lang}${window.location.pathname}`;
  }

  return (
    <>
      <route.view />
    </>
  );
};

export default AppView;
