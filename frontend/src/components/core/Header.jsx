import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import RouterContext from "@/plugins/router";
import StoreContext from "@/plugins/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUser, faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import OkpRouteLink from "@/components/common/RouteLink.jsx";
import imgLogo from "@/assets/img/oykus-white-50.png";

const CoreHeader = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { goRoute } = useContext(RouterContext);
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
              <button onClick={() => { goRoute("/", lang) }}>
                <span>{t("Oykus")}</span>
              </button>
            </li>
          </ul>
          <ul id="okp-core-header-games">
            <li>
              <OkpRouteLink route={`/${lang}/hobeon/`} children={t("Hobeon")} />
            </li>
            <li>
              <OkpRouteLink route={`/${lang}/rhansidor/`} children={t("Rhansidor")} />
            </li>
          </ul>
        </nav>
        <nav id="okp-core-header-nav-user" aria-label="User">
          <ul>
            <li>
              <a href="/" className="okp-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a href="/" className="okp-icon okp-dot">
                <FontAwesomeIcon icon={faBell} />
              </a>
            </li>
            <li>
              <button type="button" className="okp-btn-text" onClick={() => { setStoreSidebarOpen(!sidebarOpen) }}>
                <div className="okp-avatar">
                  {/* <img src={imgLogo} alt="Oykus" width={32} height={32} style={{ opacity: 0.4}} /> */}
                  <span className="okp-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <div className="okp-user">
                  <span className="okp-username">M-C Pronovost</span>
                </div>
                <div className="okp-toggle">
                  <FontAwesomeIcon icon={sidebarOpen ? faXmark : faChevronDown} />
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
};

export default CoreHeader;
