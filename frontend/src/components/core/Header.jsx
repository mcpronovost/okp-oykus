import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import imgLogo from "@/assets/img/oykus-white-50.png";

const CoreHeader = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen, setStoreSidebarOpen } = useContext(StoreContext);

  return (
    <>
      <header id="okp-core-header">
        <nav id="okp-core-header-nav-main" aria-label="Main">
          <ul id="okp-core-header-logo">
            <li className="okp-logo">
              <a href={`/${lang}/`}>
                <img src={ imgLogo } alt="Oykus" width={50} height={50} />
              </a>
            </li>
            <li className="okp-name">
              <a href={`/${lang}/`}>
                <span>{t("Oykus")}</span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href={`/${lang}/hobeon/`}>{t("Hobeon")}</a>
            </li>
            <li>
              <a href={`/${lang}/rhansidor/`}>{t("Rhansidor")}</a>
            </li>
          </ul>
        </nav>
        <nav id="okp-core-header-nav-user" aria-label="User">
          <ul>
            <li>
              <a href="/">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a href="/">
                <FontAwesomeIcon icon={faBell} />
              </a>
            </li>
            <li>
              <button type="button" className="okp-btn-text" onClick={() => { setStoreSidebarOpen(!sidebarOpen) }}>
                <span>{t("Anonymous Player")}</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
};

export default CoreHeader;
