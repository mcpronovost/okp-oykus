import { useEffect } from "react";
import { useLocation, useRouteError } from "react-router-dom";
import { Scrollbars } from "rc-scrollbars";
import OkpCoreHeader from "@/components/core/Header";
import OkpCoreNavbar from "@/components/core/Navbar";
import OkpCoreSidebar from "@/components/core/Sidebar";
import OkpHeader from "@/components/common/Header";

export default function Error404View() {
  const location = useLocation();
  const error = useRouteError();

  useEffect(() => {
    if (location.pathname == "/g/" || !location.pathname.startsWith("/g/")) {
      const tag = document.head.querySelector("#okp-game-stylesheet");
      if (!!tag) tag.remove();
    }
  }, [location]);

  return (
    <>
      <OkpCoreHeader />
      <div id="okp-core-body">
      <OkpCoreNavbar />
        <main id="okp-core-main">
          <Scrollbars style={{ height: "100%" }} autoHide>
            <div className="okp-fullview">
              <OkpHeader title={`Error ${error.status}`} />
              {error.status == 401 ? (
                <p>Oops! You're not authorized to access this page.</p>
              ) : (
                <p>Oops! This page doesn't exist.</p>
              )}
            </div>
          </Scrollbars>
        </main>
        <OkpCoreSidebar />
      </div>
    </>
  );
}
