import { useContext } from "react";
import { locales, getLang } from "@/_lib/i18n";
import RouterContext from "@/_lib/router";
import CoreHeader from "@/components/core/Header";
import CoreNavbar from "@/components/core/Navbar";
import CoreSidebar from "@/components/core/Sidebar";

const AppView = () => {
  const { route } = useContext(RouterContext);
  const lang = getLang();
  const pathUrl = window.location.pathname;

  if (pathUrl != "/" && pathUrl.endsWith("/")) {
    window.location.pathname = pathUrl.slice(0, -1);
  }

  return (
    <>
      <CoreHeader />
      <div id="okp-core-body">
        <CoreNavbar />
        <main id="okp-core-main">
          <route.view />
        </main>
        <CoreSidebar />
      </div>
    </>
  );
};

export default AppView;
