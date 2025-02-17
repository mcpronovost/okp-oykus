import {
  Bell,
  Mail,
  Smile,
} from "lucide-react";
import { t } from "@mcpronovost/okp-i18n";
import { r } from "@mcpronovost/okp-router";
import imgLogo from "@/assets/img/logo.png";

export default function Header() {
  return (
    <header id="okp-layout-header">
      <section className="okp-header-branding">
        <a
          href={r("home")}
          className="okp-header-branding-link"
          role="link"
          aria-label="Oykus"
        >
          <figure className="okp-header-branding-logo">
            <img src={imgLogo} alt="Oykus" />
          </figure>
          <span className="okp-header-branding-title">Oykus</span>
        </a>
      </section>
      <section className="okp-header-menu">
        <nav>
          <ul>
            <li>
              <a href={r("devblog")}>{t("Devblog")}</a>
            </li>
            <li>
              <a href={r("faq")}>{t("FAQ")}</a>
            </li>
            <li>
              <a href={r("privacy-policy")}>{t("Privacy Policy")}</a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="okp-header-spacer"></section>
      <section className="okp-header-notifications">
        <div>
          <button>
            <Bell />
          </button>
        </div>
        <div>
          <button>
            <Mail />
          </button>
        </div>
        <div>
          <button>
            <Smile />
          </button>
        </div>
      </section>
      <section className="okp-header-auth">
        <a href={r("login")} className="okp-header-auth-login">
          <span>{t("Login")}</span>
        </a>
        <a href={r("register")} className="okp-header-auth-register">
          <span>{t("Register")}</span>
        </a>
      </section>
    </header>
  );
}
