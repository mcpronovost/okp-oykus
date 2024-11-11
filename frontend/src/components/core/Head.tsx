import { useContext } from "react";
import { Bell, LayoutPanelLeft, Mail, Smile } from "lucide-react";
import { WebContext } from "@/_libs/stores/ContextWeb";
import imgLogo from "@/_assets/img/oykus-32.png";

export default function CoreHead () {
  const { lang, doToggleCoreLeft } = useContext(WebContext);
  const t = (v: string) => v;
  const user = null;

  return (
    <header id="okp-core-head">
      <section className="okp-branding">
        <a href="/" className="okp-branding-link">
          <div className="okp-branding-logo">
            <img src={imgLogo} alt="Oykus whale logo" width="32" height="32" />
          </div>
          <span className="okp-branding-name">Oykus</span>
        </a>
      </section>
      <section className="okp-toggle">
        <button type="button" onClick={doToggleCoreLeft} aria-label="Toggle left sidebar">
          <LayoutPanelLeft size={20} />
        </button>
      </section>
      <section className="okp-menu">
        <nav>
          <ul>
            <li>
              <a href="/">{t("About")}</a>
            </li>
            <li>
              <a href="/">Cynorrs</a>
            </li>
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Politique de confidentialité</a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="okp-space"></section>
      <section className="okp-notifications">
        <div className="okp-notifications-alerts">
          <div className="okp-wrapper">
            <div><Bell /></div>
          </div>
        </div>
        <div className="okp-notifications-privates">
          <div className="okp-wrapper">
            <div><Mail /></div>
          </div>
        </div>
        <div className="okp-notifications-friends">
          <div className="okp-wrapper">
            <div><Smile /></div>
          </div>
        </div>
      </section>
      <section className="okp-auth">
        {(user) && (
          <div className="okp-auth-user">
            <div className="okp-auth-user-playername">
              <span>{user.playername}</span>
            </div>
            <div className="okp-auth-user-avatar">
              <figure>
                {(user.avatar) ? <img src={user.avatar} alt="" width="32" height="32" /> : <span>{qpabbr(user.playername)}</span>}
              </figure>
            </div>
          </div>
        )}
      </section>
    </header>
  );
}

