import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { router } from "@/stores/storeWeb";

export function useRouter () {
  const $router = useStore(router);
  const [route, setRoute] = useState<string | null>(null);

  const doSetRouter = (href: string) => {
    router.set(href);
    window.history.pushState({}, "", href);
  };

  const doSetRoute = (href: string) => {
    setRoute(href.split(/\/g\/[\w-]+\//)[1] || "forum");
  };

  const doCleanRouter = () => {
    router.set(null);
    setRoute(null);
  };

  useEffect(() => {
    if ($router) {
      doSetRoute($router);
    }
  }, [$router]);

  return { route, doSetRouter, doSetRoute, doCleanRouter };
}