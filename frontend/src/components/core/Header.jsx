import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUser, faChevronDown, faXmark, faRightToBracket, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import OkpRouteLink from "@/components/common/RouteLink.jsx";
import imgLogo from "@/assets/img/oykus-white-50.png";

const CoreHeader = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { user, sidebarOpen, setStoreSidebarOpen } = useContext(StoreContext);

  return (
    <>
      <header id="okp-core-header">
        <nav id="okp-core-header-nav-main" aria-label={t("Main Navigation")}>
          <ul id="okp-core-header-logo">
            <li className="okp-logo">
              <a href={`/${lang}/`}>
                <img src={ imgLogo } alt="Oykus" width={50} height={50} />
              </a>
            </li>
            <li className="okp-name">
              <OkpRouteLink route={`/${lang}/`}>
                <span>{t("Oykus")}</span>
              </OkpRouteLink>
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
        {(user) && (
          <nav id="okp-core-header-nav-user" aria-label={t("User Navigation")}>
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
                    {(user.avatar) && (
                      <img src={user.avatar} alt="Oykus" width={32} height={32} style={{ opacity: 0.4}} />
                    )}
                    {(!user.avatar) && (
                      <span className="okp-icon">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    )}
                  </div>
                  <div className="okp-user">
                    <span className="okp-username">{user.name}</span>
                  </div>
                  <div className="okp-toggle">
                    <FontAwesomeIcon icon={sidebarOpen ? faXmark : faChevronDown} />
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        )}
        {(!user) && (
          <nav id="okp-core-header-nav-auth" aria-label={t("Authentication Navigation")}>
            <ul>
              <li>
                <OkpRouteLink route={`/${lang}${t("/auth/login")}/`}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>{t("Login")}</span>
                </OkpRouteLink>
              </li>
              <li>
                <OkpRouteLink route={`/${lang}${t("/auth/register")}/`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>{t("Register")}</span>
                </OkpRouteLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  )
};

export default CoreHeader;
