import { Layout, Tooltip } from "antd";
import { UsersRound, Orbit } from "lucide-react";
import { useInitData } from "@/services/initData";
import { useTranslation } from "@/services/translation";
import { OkpScrollarea, OkpAvatar, OkpLink } from "@/components/ui";
import imgPachua from "@/assets/img/pachua.jpg";

export default function OkpSideGame() {
  const { Sider } = Layout;
  const { t } = useTranslation();
  const { sideGamesPopular } = useInitData();

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
        <ul className="okp-list">
          <li className="okp-list-header">
            <UsersRound size={24} aria-label={t("Your Characters")} />
          </li>
          <li className="okp-list-item">
            <Tooltip title={"Pachu'a Wapi-Qatlaalawsiq"} placement="left">
              <OkpLink href="w/oykus/characters/01-pachua-wapi-qatlaalawsiq">
                <OkpAvatar src={imgPachua} alt="Game" size={48} />
              </OkpLink>
            </Tooltip>
          </li>
          <li className="okp-list-item">
            <Tooltip title="Pachu'a Wapi-Qatlaalawsiq" placement="left">
              <OkpLink href="w/oykus/characters/01-pachua-wapi-qatlaalawsiq">
                <OkpAvatar src={imgPachua} alt="Game" size={48} />
              </OkpLink>
            </Tooltip>
          </li>
        </ul>
        {sideGamesPopular && (
          <ul className="okp-list">
            <li className="okp-list-header">
              <Orbit size={24} aria-label={t("Popular Games")} />
            </li>
            {sideGamesPopular.map((game) => (
              <li className="okp-list-item" key={game.id}>
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
