import React, { Suspense, useContext, useEffect, useState } from "react";
import { RouterContext } from "@/_libs/stores/RouterContext";

export default function GameView() {
  const { route, gameRoute } = useContext(RouterContext);
  const [View, setView] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);

  const doSetView = (path: string | null) => {
    console.log("path : ", path);
    if (!path || path === "/" || path == "") {
      setView(React.lazy(() => import("./forums/Index")));
    } else if (/^\/c\d+-[\w-]+\/s\d+-[\w-]+\/t\d+-[\w-]+/.test(path)) {
      setView(React.lazy(() => import("./forums/Topic")));
    } else if (/^\/c\d+-[\w-]+\/s\d+-[\w-]+/.test(path)) {
      setView(React.lazy(() => import("./forums/Section")));
    } else if (/^\/c\d+-[\w-]+/.test(path)) {
      setView(React.lazy(() => import("./forums/Category")));
    } else if (path === "rules") {
      setView(React.lazy(() => import("./forums/Index")));
    } else {
      setView(null);
    }
  };

  useEffect(() => {
    doSetView(route.replace(/^\/g\/[\w-]+/, "") || "/");
  }, [route]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {View ? <View key={gameRoute} /> : <div>Not found</div>}
    </Suspense>
  );
}
