import type { User } from "@/_libs/types/auth.types";
import type { Game, Character } from "@/_libs/types/games.types";
import React, { useContext } from "react";
import { Drama, Sparkles } from "lucide-react";
import { getTranslation } from "@/_libs/i18n";
import WebContext from "@/_libs/store/storeWeb";

interface Props {
  slug?: string;
  user?: User;
  characters?: Character[];
  games?: Game[];
}

export default function OkpCoreRight ({ slug, user, characters, games }: Props) {
  const { lang } = useContext(WebContext);
  const t = getTranslation(lang);

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
                <a href={character.game?.slug ? `/g/${character.game?.slug}/community/c${character.id}-${character.slug}/` : "#"} className="okp-right-card-link" aria-label={character.name} title={character.name}>
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
            {games.map((game) => ((!slug || slug != game.slug) && (
              <li key={game.id} className="okp-right-card">
                <a href={`/g/${game.slug}/`} className="okp-right-card-link" aria-label={game.name} title={game.name}>
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
