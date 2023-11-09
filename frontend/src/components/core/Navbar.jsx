import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import RouterContext from "@/plugins/router";
import { Scrollbars } from "rc-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faAward, faTrophy, faRankingStar, faCog } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const CoreNavbar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { goRoute, isCurrentRoute } = useContext(RouterContext);

  const mainNavigation = [
    {
      name: t("Home"),
      url: `/`,
      icon: faHome
    },
    {
      name: t("Community"),
      url: `${t("/community/")}`,
      icon: faUsers
    },
    {
      name: t("Awards"),
      url: `${t("/awards/")}`,
      icon: faAward
    },
    {
      name: t("Achievements"),
      url: `${t("/achievements/")}`,
      icon: faTrophy
    },
    {
      name: t("Rankings"),
      url: `${t("/rankings/")}`,
      icon: faRankingStar
    }
  ]

  return (
    <nav id="okp-core-navbar">
      <Scrollbars>
        <div id="okp-core-navbar-wrapper">
          <ul>
            {mainNavigation.map((nav, i) => (
              <li key={`navbar-link-${i}`}>
                <button type="button" className={isCurrentRoute(nav.url, lang) ? "okp-active" : null} onClick={() => { goRoute(nav.url, lang) }} aria-label={nav.name}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={nav.icon} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <ul id="okp-core-navbar-nav-footer">
            <li>
              <a href={`/${lang}${t("/settings/")}`} aria-label={t("Settings")}>
                <span className="okp-icon">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </a>
            </li>
            <li>
              <a href={`/${lang}${t("/faq/")}`} aria-label={t("FAQ")}>
                <span className="okp-icon">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Scrollbars>
    </nav>
  )
};

export default CoreNavbar;
