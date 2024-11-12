// import type { User } from "@/_libs/types/auth.types";
import { useContext } from "react";
import { Award, ChartNoAxesCombined, House, Settings, Trophy } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import { AppContext } from "@/_libs/stores/AppContext";
import { AuthContext } from "@/_libs/stores/AuthContext";
import { I18nContext } from "@/_libs/stores/I18nContext";
import { RouterContext } from "@/_libs/stores/RouterContext";
// import OkpCoreLeftNavGame from "./left/NavGame";

export default function CoreLeft () {
  const { isCoreLeftOpen } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { t } = useContext(I18nContext);
  const { doRoute } = useContext(RouterContext);

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
              <a href="/" onClick={doRoute}>
                <span className="okp-icon" aria-hidden="true">
                  <House size={24} />
                </span>
                <span className="okp-text">
                  {t("Home")}
                </span>
              </a>
            </li>
            <li>
              <a href="/achievements" onClick={doRoute}>
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
          {/* {!!slug && (
            <OkpCoreLeftNavGame slug={slug} />
          )} */}
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

