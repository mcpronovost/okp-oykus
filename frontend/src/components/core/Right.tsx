import type { Character, Game } from "@/_libs/types/games.types";
import { useContext, useEffect, useState } from "react";
import { Drama, Sparkles } from "lucide-react";
import { I18nContext } from "@/_libs/stores/I18nContext";
import { RouterContext } from "@/_libs/stores/RouterContext";
import { authApi, gamesApi } from "@/_libs/utils/api";

export default function CoreRight () {
  const { t } = useContext(I18nContext);
  const { doRoute, gameSlug } = useContext(RouterContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    authApi.getCharacters().then(setCharacters);
    gamesApi.getGames().then(setGames);
  }, []);

  return (
    <aside id="okp-core-right">
      {(!!characters?.length) && (
        <nav className="okp-right-games">
          <ul className="okp-right-cards">
            <li className="okp-right-card">
              <span className="okp-siderigh-card-icon" aria-label={t("Characters")} title={t("Characters")}>
                <Drama size={20} />
              </span>
            </li>
            {characters.map((character) => (
              <li key={character.id} className="okp-right-card">
                <a href={character.game?.slug ? `/g/${character.game?.slug}/community/c${character.id}-${character.slug}/` : "#"} onClick={doRoute} className="okp-right-card-link" aria-label={character.name} title={character.name}>
                  {character.avatar ? (
                    <img src={character.avatar} alt={character.name} width={32} height={32} loading="lazy" className="okp-right-card-link-img" />
                  ) : (
                    <span className="okp-right-card-link-abbr">{character.abbr}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {(!!games?.length) && (
        <nav className="okp-right-games">
          <ul className="okp-right-cards">
            <li className="okp-right-card">
              <span className="okp-right-card-icon" aria-label={t("Games")} title={t("Games")}>
                <Sparkles size={20} />
            </span>
            </li>
            {games.map((game) => ((!gameSlug || gameSlug != game.slug) && (
              <li key={game.id} className="okp-right-card">
                <a href={`/g/${game.slug}/`} onClick={doRoute} className="okp-right-card-link" aria-label={game.name} title={game.name}>
                  {game.logo ? (
                    <img src={game.logo} alt={game.name} width={32} height={32} loading="lazy" className="okp-right-card-link-img" />
                  ) : <span className="okp-right-card-link-abbr">{game.abbr}</span>}
                </a>
              </li>
            )))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
