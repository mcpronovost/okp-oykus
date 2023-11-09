import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import RouterContext from "@/plugins/router";
import { Scrollbars } from "rc-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faAward, faTrophy, faRankingStar, faCog } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import OkpRouteLink from "@/components/common/RouteLink.jsx";

const CoreNavbar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { isCurrentRoute } = useContext(RouterContext);

  const mainNavigation = [
    {
      name: t("Community"),
      url: `/${lang}${t("/community/")}`,
      icon: faUsers
    },
    {
      name: t("Awards"),
      url: `/${lang}${t("/awards/")}`,
      icon: faAward
    },
    {
      name: t("Achievements"),
      url: `/${lang}${t("/achievements/")}`,
      icon: faTrophy
    },
    {
      name: t("Rankings"),
      url: `/${lang}${t("/rankings/")}`,
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
                <OkpRouteLink route={nav.url} classes={isCurrentRoute(nav.url) ? "okp-active" : null} arialabel={nav.name}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={nav.icon} />
                  </span>
                </OkpRouteLink>
              </li>
            ))}
          </ul>
          <ul id="okp-core-navbar-nav-footer">
            <li>
              <OkpRouteLink route={`/${lang}${t("/settings/")}`} classes={isCurrentRoute(`/${lang}${t("/settings/")}`) ? "okp-active" : null} arialabel={t("Settings")}>
                <span className="okp-icon">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </OkpRouteLink>
            </li>
            <li>
              <OkpRouteLink route={`/${lang}${t("/faq/")}`} classes={isCurrentRoute(`/${lang}${t("/faq/")}`) ? "okp-active" : null} arialabel={t("FAQ")}>
                <span className="okp-icon">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </span>
              </OkpRouteLink>
            </li>
          </ul>
        </div>
      </Scrollbars>
    </nav>
  )
};

export default CoreNavbar;
