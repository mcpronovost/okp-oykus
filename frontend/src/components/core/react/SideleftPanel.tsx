import type { Lang } from "@/types/i18n.types";
import type { User } from "@/types/auth.types";
import React from "react";
import { Award, ChartNoAxesCombined, House, LibraryBig, MessagesSquare, Scale, Settings, Trophy, Users } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import { useRouter } from "@/hooks/core/useRouter";
import { useSideleft } from "@/hooks/core/useSideleft";
import { getTranslation } from "@/i18n/i18n";

export default function SideleftPanel ({ lang, user, slug, open }: { lang: Lang, user: User, slug: string, open: boolean }) {
  const t = getTranslation(lang);
  const { isOpen } = useSideleft(open);
  const { doRoute } = useRouter();

  return (
    <>
      <aside id="okp-core-sideleft" className={`okp-scrollable ${isOpen ? "okp-open" : "okp-close"}`}>
        <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
          <header className="okp-sideleft-auth">
            {!!user ? (
              <section className="okp-sideleft-auth-display" aria-hidden="true">
                <figure className="okp-sideleft-auth-display-banner">
                {(user.avatar) && <img src={user.avatar} alt="" className="okp-sideleft-auth-display-banner-img" />}
                </figure>
                <figure className="okp-sideleft-auth-display-avatar">
                  {(user.avatar) ? (
                    <img src={user.avatar} alt="" className="okp-sideleft-auth-display-avatar-img" />
                  ) : (
                    <span className="okp-sideleft-auth-display-avatar-abbr">
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
            <div className="okp-sideleft-space"></div>
            <ul className="okp-sideleft-settings">
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
    </>
  );
}