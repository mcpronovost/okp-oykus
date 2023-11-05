import { getTranslation, getLang } from "@/plugins/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faAward, faTrophy } from "@fortawesome/free-solid-svg-icons";

const CoreNavbar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <nav id="okp-core-navbar">
        <ul>
          <li>
            <a href="#" aria-label={t("Home")}>
              <span className="okp-icon">
                <FontAwesomeIcon icon={faHome} />
              </span>
            </a>
          </li>
          <li>
            <a href="#" aria-label={t("Community")}>
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
        </ul>
      </nav>
    </>
  )
};

export default CoreNavbar;
