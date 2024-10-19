import { Link } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import imgOykus from "@/_assets/img/oykus-w.png";

export default function HeaderBrand() {
  const t = getTrans();

  return (
    <div className="okp-brand">
      <Link to={t("/")} aria-label={t("BackToHome")} className="okp-brand-link">
        <div className="okp-brand-logo">
          <img
            src={imgOykus}
            alt="Oykus"
            width="48"
            height="48"
            className="okp-brand-img"
          />
        </div>
        <span className="okp-brand-name">{t("Oykus")}</span>
      </Link>
    </div>
  );
}
