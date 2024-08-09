import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StoreContext from "@/_lib/store";
import { getPing } from "@/_lib/api";
import OkpCoreHeader from "@/components/core/Header";
import OkpCoreNavbar from "@/components/core/Navbar";
import OkpCoreSidebar from "@/components/core/Sidebar";

export default function CoreView() {
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
      // if (!ping && user) navigate("/logout");
      // if (!ping && route.needauth) navigate("/login");
    } catch (e) {
      console.log(">> ", e);
    }
  };

  useEffect(() => {
    (async () => {
      if (user && user.updated < (Date.now() + (5 * 60 * 1000))) {
        await doPing();
      }// else if (!user && route.needauth) navigate("/login");
    })();
  }, [location]);

  return (
    <>
      <OkpCoreHeader />
      <div id="okp-core-body">
        {!!user && <OkpCoreNavbar />}
        <main id="okp-core-main">
          <Outlet />
        </main>
        {!!user && <OkpCoreSidebar />}
      </div>
    </>
  );
}
