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
                <a href="#" aria-label={t("Home")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("Community")} class="okp-active">
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("Badges")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faAward} />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("Achievements")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("Ranking")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faRankingStar} />
                  </span>
                </a>
              </li>
            </ul>
            <ul id="okp-core-navbar-nav-footer">
              <li>
                <a href="#" aria-label={t("Settings")}>
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faCog} />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("Informations")}>
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
