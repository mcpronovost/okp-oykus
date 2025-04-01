import "@/assets/styles/page/auth/games.scss";
import { useState } from "react";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { okpUnit } from "@/utils";
import { OkpLayout } from "@/components/layout";
import { OkpButton, OkpCard, OkpEmpty, OkpHeading, OkpTag } from "@/components/ui";
import OkpAuthGamesNewGame from "@/components/auth/games/forms/NewGame";

function OkpAuthGamesHeadingActions({ handleClickCreate }) {
  const { t } = useTranslation();

  return (
    <OkpButton onClick={handleClickCreate}>
      {t("Create Game")}
    </OkpButton>
  );
}

export default function OkpAuthGames({ data }) {
  const { r } = useRouter();
  const { t } = useTranslation();

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleClick = (gameId) => {
    window.location.href = r(`a/games/${gameId}/edit`);
  };

  const handleClickCreate = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        {showCreateForm ? (
          <OkpAuthGamesNewGame maxOwnedGames={data?.user?.max_owned_games || 0} totalOwnedGames={data?.user?.total_owned_games || 0} onCancel={handleCancelCreate} />
        ) : (
          <>
            <OkpHeading title={t("Your Games")} tag="h1" actions={<OkpAuthGamesHeadingActions handleClickCreate={handleClickCreate} />} />
            {data?.games?.length > 0 ? (
              <section className="okp-auth-games-list">
                {data?.games?.map((game) => (
                  <OkpCard key={game.id} hoverable direction="row" className="okp-auth-games-list-card" onClick={() => handleClick(game.id)}>
                    <div className="okp-auth-games-list-card-identity">
                      <h2 className="okp-auth-games-list-card-identity-title">{game.title}</h2>
                      <div className="okp-auth-games-list-card-identity-flags">
                        {game.is_active ? (
                          <OkpTag color="success">{t("Active")}</OkpTag>
                        ) : (
                          <OkpTag color="error">{t("Inactive")}</OkpTag>
                        )}
                        {game.is_public ? (
                          <OkpTag color="success">{t("Public")}</OkpTag>
                        ) : (
                          <OkpTag color="error">{t("Private")}</OkpTag>
                        )}
                      </div>
                    </div>
                    <div className="okp-auth-games-list-card-statistics">
                      <ul className="okp-auth-games-list-card-statistics-list">
                        <li className="okp-auth-games-list-card-statistics-list-item">
                          <span className="okp-auth-games-list-card-statistics-list-item-label">{t("Players", game.total_users)}</span>
                          <span className="okp-auth-games-list-card-statistics-list-item-value">{okpUnit(game.total_users)}</span>
                        </li>
                        <li className="okp-auth-games-list-card-statistics-list-item">
                          <span className="okp-auth-games-list-card-statistics-list-item-label">{t("Characters", game.total_characters)}</span>
                          <span className="okp-auth-games-list-card-statistics-list-item-value">{okpUnit(game.total_characters)}</span>
                        </li>
                        <li className="okp-auth-games-list-card-statistics-list-item">
                          <span className="okp-auth-games-list-card-statistics-list-item-label">{t("Topics", game.total_topics)}</span>
                          <span className="okp-auth-games-list-card-statistics-list-item-value">{okpUnit(game.total_topics)}</span>
                        </li>
                        <li className="okp-auth-games-list-card-statistics-list-item">
                          <span className="okp-auth-games-list-card-statistics-list-item-label">{t("Posts", game.total_posts)}</span>
                          <span className="okp-auth-games-list-card-statistics-list-item-value">{okpUnit(game.total_posts)}</span>
                        </li>
                      </ul>
                    </div>
                  </OkpCard>
                ))}
              </section>
            ) : (
              <OkpCard>
                <OkpEmpty
                  text={t("No games found")}
                  subtext={t("Create a game to start")}
                />
              </OkpCard>
            )}
          </>
        )}
      </div>
    </OkpLayout>
  );
}
