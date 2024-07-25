import "@/_assets/styles/App.css";
import { useContext } from "react";
import { locales, getLang } from "@/_lib/i18n";
import RouterContext from "@/_lib/router";

const AppView = () => {
  const { route } = useContext(RouterContext);
  const lang = getLang();
  const pathUrl = window.location.pathname;

  if (pathUrl != "/" && pathUrl.endsWith("/")) {
    window.location.pathname = pathUrl.slice(0, -1);
  }

  return (
    <>
      {!route.hidelayout && <header>(topbar)</header>}
      <route.view />
    </>
  );
};

export default AppView;
