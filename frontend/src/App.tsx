import { useContext, useEffect } from "react";
import { AuthContext } from "@/_libs/stores/AuthContext";
import { RouterContext } from "@/_libs/stores/RouterContext";
import OkpCoreHead from "@/components/core/Head";
import OkpCoreLeft from "@/components/core/Left";
import OkpCoreRight from "@/components/core/Right";

export default function App({ children }: { children: React.ReactNode }) {
  const { doUpdateUser } = useContext(AuthContext);
  const { route, doRouteTo } = useContext(RouterContext);

  // Check current route
  const doCheckCurrentRoute = (push: boolean = true) => {
    const currentRoute = window.location.pathname;
    if (route !== currentRoute) {
      doRouteTo(currentRoute, push);
    }
  };

  // Initialization
  useEffect(() => {
    doUpdateUser();
    doCheckCurrentRoute();
  }, []);

  // Handle popstate
  useEffect(() => {
    const handlePopState = () => {
      doCheckCurrentRoute(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <OkpCoreHead />
      <div id="okp-core-body">
        <OkpCoreLeft />
        <main id="okp-core-main">
          {children}
        </main>
        <OkpCoreRight />
      </div>
    </>
  )
}
