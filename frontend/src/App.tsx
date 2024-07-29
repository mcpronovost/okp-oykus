import { useContext, useEffect } from "react";
import { getPing } from "@/_lib/api";
import { locales, getLang } from "@/_lib/i18n";
import RouterContext from "@/_lib/router";
import StoreContext from "@/_lib/store";
import CoreHeader from "@/components/core/Header";
import CoreNavbar from "@/components/core/Navbar";
import CoreSidebar from "@/components/core/Sidebar";

function AppView () {
  const { route, goRoute } = useContext(RouterContext);
  const { user } = useContext(StoreContext);
  const lang = getLang();
  const pathUrl = window.location.pathname;

  if (pathUrl != "/" && pathUrl.endsWith("/")) {
    window.location.pathname = pathUrl.slice(0, -1);
  }

  useEffect(() => {
    (async () => {
      const ping = await getPing(user);
      if (route.needauth && !ping) goRoute("/login");
    })();
  }, [route]);

  return (
    <>
      <CoreHeader />
      <div id="okp-core-body">
        {!!user && <CoreNavbar />}
        <main id="okp-core-main">
          {(!route.needauth || user) && (
            <route.view />
          )}
        </main>
        {!!user && <CoreSidebar />}
      </div>
    </>
  );
};

export default AppView;
