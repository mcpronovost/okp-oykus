import { getTranslation, getLang } from "@/plugins/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const CoreHeader = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <header id="okp-core-header">
        <nav aria-label="Main">
          <ul>
            <li>
              <a href={`/${lang}/`}>{t("Home")}</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href={`/${lang}${t("/error/")}`}>{t("Community")}</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/">{t("Hobeon")}</a>
            </li>
            <li>
              <a href="/">{t("Rhansidor")}</a>
            </li>
          </ul>
        </nav>
        <nav aria-label="User">
          <ul>
            <li>
              <a href="/">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a href="/">{t("Anonymous Player")}</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
};

export default CoreHeader;
