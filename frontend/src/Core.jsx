import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Scrollbars } from "rc-scrollbars";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";
import { getPing } from "@/_lib/api";
import OkpCoreHeader from "@/components/core/Header";
import OkpCoreNavbar from "@/components/core/Navbar";
import OkpCoreSidebar from "@/components/core/Sidebar";

export default function CoreView() {
  const t = getTrans();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(StoreContext);

  const doPing = async () => {
    try {
      const ping = await getPing(user);
      if (ping) {
        setUser({
          ...ping
        });
      }
      if (!ping && user) navigate(t("/logout"));
      // if (!ping && route.needauth) navigate("/login");
    } catch {
      navigate(t("/logout"));
    }
  };

  useEffect(() => {
    // ===---
    if (location.pathname == "/g/" || !location.pathname.startsWith("/g/")) {
      const tag = document.head.querySelector("#okp-game-stylesheet");
      if (!!tag) tag.remove();
    }
    // ===---
    if (!["/deconnexion", "/en/logout"].includes(location.pathname)) {
      if (user && (import.meta.env.DEV || user.updated > (Date.now() + (5 * 60 * 1000)))) {
        (async () => {
          await doPing();
        })();
      }// else if (!user && route.needauth) navigate("/login");
    // ===---
    }
  }, [location]);

  return (
    <>
      <OkpCoreHeader />
      <div id="okp-core-body">
        <OkpCoreNavbar />
        <main id="okp-core-main">
          <Scrollbars style={{ height: "100%" }} autoHide>
            <Outlet />
          </Scrollbars>
        </main>
        <OkpCoreSidebar />
      </div>
    </>
  );
}
