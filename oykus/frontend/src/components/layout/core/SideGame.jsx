import { Layout, Tooltip } from "antd";
import { UsersRound, Orbit } from "lucide-react";
import { useInitData } from "@/services/initData";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import { OkpScrollarea, OkpAvatar, OkpLink } from "@/components/ui";
import imgPachua from "@/assets/img/pachua.jpg";

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
                <Tooltip title={character.name} placement="left">
                  <OkpLink href={`w/oykus/characters/${character.slug}`}>
                    <OkpAvatar src={character.avatar} fallback={character.abbr} alt={character.name} size={48} />
                  </OkpLink>
                </Tooltip>
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
                <Tooltip title={game.title} placement="left">
                  <OkpLink href={`g/${game.slug}`}>
                    <OkpAvatar src={game.image} fallback={game.abbr} color={game.primary} alt="Game" size={48} />
                  </OkpLink>
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </OkpScrollarea>
    </Sider>
  );
}
