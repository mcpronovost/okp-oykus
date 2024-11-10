import type { User } from "@/_libs/types/auth.types";
import type { Game } from "@/_libs/types/games.types";
import React, { Suspense } from "react";
import OkpLoading from "@/components/common/Loading";
import OkpNotFound from "@/components/common/NotFound";
import OkpCore from "@/components/core/Core";

interface Props {
  // children?: React.ReactNode;
  slug?: string;
  uri?: string;
  user?: User;
  game?: Game;
}

export default function OkpGameView ({ slug, uri, user, game }: Props) {
  let View;
  if (!uri) {
    View = React.lazy(() => import("./forums/Index"));
  } else if (/^c\d+-[\w-]+\/s\d+-[\w-]+\/t\d+-[\w-]+/.test(uri)) {
    View = React.lazy(() => import("./forums/Topic"));
  } else if (/^c\d+-[\w-]+\/s\d+-[\w-]+/.test(uri)) {
    View = React.lazy(() => import("./forums/Section"));
  } else if (/^c\d+-[\w-]+/.test(uri)) {
    View = React.lazy(() => import("./forums/Category"));
  } else if (uri === "rules") {
    View = React.lazy(() => import("./forums/Index"));
  } else {
    View = () => <OkpNotFound />;
  }

  return (
    <OkpCore slug={slug} user={user}>
      {(game) && (
        <section className="okp-game">
          <header className="okp-game-header">
            <h1 className="okp-game-header-title">{game?.name}</h1>
          </header>
          <Suspense fallback={<OkpLoading />}>
            <View slug={slug} uri={uri} game={game} />
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
