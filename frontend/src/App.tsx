import { useContext, useEffect } from "react";
import SimpleBarReact from "simplebar-react";
import { AuthContext } from "@/_libs/stores/AuthContext";
import { RouterContext } from "@/_libs/stores/RouterContext";
import OkpCoreHead from "@/components/core/Head";
import OkpCoreLeft from "@/components/core/Left";
import OkpCoreRight from "@/components/core/Right";
import GameView from "@/views/GameView";

export default function App({ children }: { children: React.ReactNode }) {
  const { doUpdateUser } = useContext(AuthContext);
  const { route, doRouteTo, gameSlug } = useContext(RouterContext);

  // Check current route
  const doCheckCurrentRoute = (push: boolean = true) => {
    const currentRoute = window.location.pathname;
    if (route !== currentRoute) {
      doRouteTo(currentRoute, push);
    }
  };

  // Initialization
  useEffect(() => {
    doUpdateUser().then(() => doCheckCurrentRoute());
  }, []);

  // Handle popstate
  useEffect(() => {
    const handlePopState = () => {
      doCheckCurrentRoute(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [route]);

  return (
    <>
      <OkpCoreHead />
      <div id="okp-core-body">
        <OkpCoreLeft />
        <main id="okp-core-main">
          <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
            {gameSlug ? <GameView /> : children}
          </SimpleBarReact>
        </main>
        <OkpCoreRight />
      </div>
    </>
  )
}
