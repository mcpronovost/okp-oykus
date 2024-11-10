import type { User } from "@/_libs/types/auth.types";
import React, { useContext } from "react";
import { Award, ChartNoAxesCombined, House, LibraryBig, MessagesSquare, Scale, Settings, Trophy, Users } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import { getTranslation } from "@/_libs/i18n";
import WebContext from "@/_libs/store/storeWeb";

interface Props {
  slug?: string;
  user?: User;
}

export default function OkpCoreLeft ({ slug, user }: Props) {
  const { lang, isCoreLeftOpen } = useContext(WebContext);
  const t = getTranslation(lang);
  const doRoute = () => {};

  return (
    <aside id="okp-core-left" className={`okp-scrollable ${isCoreLeftOpen ? "okp-open" : "okp-close"}`}>
      <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
        <header className="okp-left-auth">
          {!!user ? (
            <section className="okp-left-auth-display" aria-hidden="true">
              <figure className="okp-left-auth-display-banner">
              {(user.avatar) && <img src={user.avatar} alt="" className="okp-left-auth-display-banner-img" />}
              </figure>
              <figure className="okp-left-auth-display-avatar">
                {(user.avatar) ? (
                  <img src={user.avatar} alt="" className="okp-left-auth-display-avatar-img" />
                ) : (
                  <span className="okp-left-auth-display-avatar-abbr">
                    {user.abbr}
                  </span>
                )}
              </figure>
            </section>
          ) : (
            <div>login</div>
          )}
        </header>
        <nav>
          <ul className="okp-left-main">
            <li>
              <a href="/">
                <span className="okp-icon" aria-hidden="true">
                  <House size={24} />
                </span>
                <span className="okp-text">
                  {t("Home")}
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="okp-icon" aria-hidden="true">
                  <Trophy size={24} />
                </span>
                <span className="okp-text">
                  {t("Achievements")}
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="okp-icon" aria-hidden="true">
                  <Award size={24} />
                </span>
                <span className="okp-text">
                  {t("Awards")}
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="okp-icon" aria-hidden="true">
                  <ChartNoAxesCombined size={24} />
                </span>
                <span className="okp-text">
                  {t("Leaderboards")}
                </span>
              </a>
            </li>
          </ul>
          {!!slug && (
            <ul className="okp-left-game">
              <li>
                <a href={`/g/${slug}/rules`} onClick={doRoute}>
                  <span className="okp-icon" aria-hidden="true">
                    <Scale size={24} />
                  </span>
                  <span className="okp-text">
                    {t("Rules")}
                  </span>
                </a>
              </li>
              <li>
                <a href={`/g/${slug}/lore`} onClick={doRoute}>
                  <span className="okp-icon" aria-hidden="true">
                    <LibraryBig size={24} />
                  </span>
                  <span className="okp-text">
                    {t("Lore")}
                  </span>
                </a>
              </li>
              <li>
                <a href={`/g/${slug}`} onClick={doRoute}>
                  <span className="okp-icon" aria-hidden="true">
                    <MessagesSquare size={24} />
                  </span>
                  <span className="okp-text">
                    {t("Forum")}
                  </span>
                </a>
              </li>
              <li>
                <a href={`/g/${slug}/community`} onClick={doRoute}>
                  <span className="okp-icon" aria-hidden="true">
                    <Users size={24} />
                  </span>
                  <span className="okp-text">
                    {t("Community")}
                  </span>
                </a>
              </li>
            </ul>
          )}
          <div className="okp-left-space"></div>
          <ul className="okp-left-settings">
            <li>
              <a href="/settings">
                <span className="okp-icon" aria-hidden="true">
                  <Settings size={24} />
                </span>
                <span className="okp-text">
                  {t("Settings")}
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </SimpleBarReact>
    </aside>
  );
}
