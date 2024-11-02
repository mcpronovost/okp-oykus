import React from "react";
import { Award, ChartNoAxesCombined, House, LibraryBig, MessagesSquare, Scale, Settings, Trophy, Users } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import { useSideleft } from "@/hooks/core/useSideleft";
import { getTranslation } from "@/i18n/i18n";
import imgAvatar from "@/assets/img/mc.jpg";

export default function SideleftPanel ({ lang, slug, open }) {
  const t = getTranslation(lang);
  const { isOpen } = useSideleft(open);
  const user = true;

  return (
    <>
      <aside id="okp-core-sideleft" className={`okp-scrollable ${isOpen ? "okp-open" : "okp-close"}`}>
        <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
          <header className="okp-sideleft-auth">
            {!!user ? (
              <section className="okp-sideleft-auth-display" aria-hidden="true">
                <figure className="okp-sideleft-auth-display-banner">
                  <img src={imgAvatar.src} alt="" className="okp-sideleft-auth-display-banner-img" />
                </figure>
                <figure className="okp-sideleft-auth-display-avatar">
                  {true ? (
                    <img src={imgAvatar.src} alt="" className="okp-sideleft-auth-display-avatar-img" />
                  ) : (
                    <span className="okp-sideleft-auth-display-avatar-abbr">MC</span>
                  )}
                </figure>
              </section>
            ) : (
              <div>login</div>
            )}
          </header>
          <nav>
            <ul className="okp-sideleft-main">
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
              <ul className="okp-sideleft-game">
                <li>
                  <a href={`/g/${slug}/rules`}>
                    <span className="okp-icon" aria-hidden="true">
                      <Scale size={24} />
                    </span>
                    <span className="okp-text">
                      {t("Rules")}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`/g/${slug}/lore`}>
                    <span className="okp-icon" aria-hidden="true">
                      <LibraryBig size={24} />
                    </span>
                    <span className="okp-text">
                      {t("Lore")}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`/g/${slug}`}>
                    <span className="okp-icon" aria-hidden="true">
                      <MessagesSquare size={24} />
                    </span>
                    <span className="okp-text">
                      {t("Forum")}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`/g/${slug}/community`}>
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
            <div className="okp-sideleft-space"></div>
            <ul className="okp-sideleft-settings">
              <li>
                <a href="/">
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
    </>
  );
}