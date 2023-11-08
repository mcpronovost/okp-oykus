import { getTranslation, getLang } from "@/plugins/i18n";
import { Scrollbars } from "rc-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faAward, faTrophy, faRankingStar, faCog } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const CoreNavbar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <nav id="okp-core-navbar">
        <Scrollbars>
          <div id="okp-core-navbar-wrapper">
            <ul>
              <li>
                <a href={`/${lang}/`} aria-label={t("Home")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                </a>
              </li>
              <li>
                <a href={`/${lang}${t("/community/")}`} aria-label={t("Community")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                </a>
              </li>
              <li>
                <a href={`/${lang}${t("/awards/")}`} aria-label={t("Awards")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faAward} />
                  </span>
                </a>
              </li>
              <li>
                <a href={`/${lang}${t("/achievements/")}`} aria-label={t("Achievements")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                  </span>
                </a>
              </li>
              <li>
                <a href={`/${lang}${t("/rankings/")}`} aria-label={t("Rankings")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faRankingStar} />
                  </span>
                </a>
              </li>
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
    </>
  )
};

export default CoreNavbar;
