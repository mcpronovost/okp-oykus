import { Layout } from "antd";
import { UsersRound, Orbit } from "lucide-react";
import { useInitData } from "@/services/initData";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import { OkpScrollarea, OkpAvatar, OkpLink, OkpTooltip } from "@/components/ui";

export default function OkpSideGame() {
  const { Sider } = Layout;
  const { sideGamesPopular } = useInitData();
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Sider
      id="okp-core-side-game"
      theme="light"
      width={64}
      reverseArrow
      style={{
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      <OkpScrollarea>
        {user?.characters?.length > 0 && (
          <ul className="okp-list">
            <li className="okp-list-header">
              <UsersRound size={24} aria-label={t("Your Characters")} />
            </li>
            {user.characters.map((character) => (
              <li key={character.id} className="okp-list-item">
                <OkpTooltip title={character.name} placement="left">
                  <OkpLink href={character.url}>
                    <OkpAvatar src={character.avatar} fallback={character.abbr} alt={character.name} size={48} />
                  </OkpLink>
                </OkpTooltip>
              </li>
            ))}
          </ul>
        )}
        {sideGamesPopular?.length > 0 && (
          <ul className="okp-list">
            <li className="okp-list-header">
              <Orbit size={24} aria-label={t("Popular Games")} />
            </li>
            {sideGamesPopular.map((game) => (
              <li key={game.id} className="okp-list-item">
                <OkpTooltip title={game.title} placement="left">
                  <OkpLink href={game.url}>
                    <OkpAvatar src={game.logo} fallback={game.abbr} colour={game.logo ? undefined : game.primary} alt="Game" size={48} />
                  </OkpLink>
                </OkpTooltip>
              </li>
            ))}
          </ul>
        )}
      </OkpScrollarea>
    </Sider>
  );
}
