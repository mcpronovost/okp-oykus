import type { User } from "@/_libs/types/auth.types";
import type { Game, Character } from "@/_libs/types/games.types";
import React, { Suspense, useContext, useState, useEffect } from "react";
import RouteContext from "@/_libs/store/storeRoute";
import WebContext from "@/_libs/store/storeWeb";
import OkpLoading from "@/components/common/Loading";
import OkpNotFound from "@/components/common/NotFound";
import OkpCore from "@/components/core/Core";

interface Props {
  // children?: React.ReactNode;
  slug?: string;
  uri?: string;
  user?: User;
  core?: {
    characters?: Character[];
    games?: Game[];
  };
  game?: Game;
}

export default function OkpGameView ({ slug, uri, user, core, game }: Props) {
  const { route } = useContext(RouteContext);
  const { lang } = useContext(WebContext);
  const [View, setView] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);

  const doSetView = (path: string | null) => {
    if (!path) {
      setView(React.lazy(() => import("./forums/Index")));
    } else if (/^c\d+-[\w-]+\/s\d+-[\w-]+\/t\d+-[\w-]+/.test(path)) {
      setView(React.lazy(() => import("./forums/Topic")));
    } else if (/^c\d+-[\w-]+\/s\d+-[\w-]+/.test(path)) {
      setView(React.lazy(() => import("./forums/Section")));
    } else if (/^c\d+-[\w-]+/.test(path)) {
      setView(React.lazy(() => import("./forums/Category")));
    } else if (path === "rules") {
      setView(React.lazy(() => import("./forums/Index")));
    } else {
      setView(null);
    }
  };

  useEffect(() => {
    console.log("game :: ", game);
    console.log("uri :: ", uri);
    doSetView(uri || null);
  }, [uri]);

  useEffect(() => {
    console.log("route :: ", route);
  }, [route]);

  return (
    <OkpCore slug={slug} user={user} core={core}>
      {(game && game.id) && (
        <section className="okp-game">
          <header className="okp-game-header">
            <h1 className="okp-game-header-title">{game?.name} - {route} - {lang}</h1>
          </header>
          <Suspense fallback={<OkpLoading />}>
            {View ? <View slug={slug} uri={uri} game={game} /> : <OkpNotFound />}
          </Suspense>
          <footer className="okp-game-footer">
            <small>
              <p>
                {game.name}&nbsp;&copy;&nbsp;{game.created_year}
                {(game.updated_year !== game.created_year) && `-${game.updated_year}`}
                {(game.founder?.playername) && ` ${game.founder.playername}`}
                &mdash; Tous droits réservés &mdash; Version {game.version}
              </p>
              <p>
                Oykus&nbsp;&copy;&nbsp;2024&nbsp;
                <a href="https://github.com/mcpronovost" target="_blank">mcpronovost</a>
                &mdash; Tous droits réservés &mdash; Version 0.3.0-alpha
              </p>
            </small>
          </footer>
        </section>
      )}
    </OkpCore>
  );
}
