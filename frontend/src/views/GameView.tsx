import type { Game } from "@/_libs/types/games.types";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { RouterContext } from "@/_libs/stores/RouterContext";
import { gamesApi } from "@/_libs/utils/api";
import OkpLoading from "@/components/common/Loading";
import OkpNotFound from "@/components/common/NotFound";

export default function GameView() {
  const { route, gameSlug } = useContext(RouterContext);
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState<Game | null>(null);
  const [View, setView] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);

  const doGetGame = async () => {
    if (!gameSlug) return;

    setIsLoading(true);
    try {
      const response = await gamesApi.getGame(gameSlug);
      setGame(response);
    } catch {
      // console.error("Error fetching game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const doSetView = (path: string | null) => {
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

  useEffect(() => {
    doGetGame();
  }, [gameSlug]);

  if (isLoading) return <OkpLoading />;

  if (!isLoading && !game) return <OkpNotFound />;

  return (
    <>
      {(!!gameSlug && game) && (
        <section className="okp-game">
          <header className="okp-game-header">
            <h1 className="okp-game-header-title">{game?.name}</h1>
          </header>
          <Suspense fallback={<OkpLoading />}>
            {View ? <View key={gameSlug} /> : <OkpNotFound />}
          </Suspense>
          <footer className="okp-game-footer">
            <small>
              <p>
                {game.name}&nbsp;&copy;&nbsp;{game.created_year}
                {(game.updated_year !== game.created_year) && `-${game.updated_year}`}
                {(game.founder?.playername || game.owner?.playername) && ` ${game.founder?.playername || game.owner?.playername} — `}
                Tous droits réservés &mdash; Version {game.version}
              </p>
              <p>
                Oykus&nbsp;&copy;&nbsp;2024&nbsp;
                <a href="https://github.com/mcpronovost" target="_blank">mcpronovost</a> &mdash; Tous droits réservés &mdash; Version 0.3.0-alpha
              </p>
            </small>
          </footer>
        </section>
      )}
    </>
  );
}
