// import { getTrans } from "@/_lib/i18n";
// import Link from "@/components/common/Link";
import imgOykus from "@/_assets/img/oykus-w.png";

export default function HeaderBrand() {

  return (
    <div className="okp-brand">
      <a href="/" className="okp-brand-link">
        <div className="okp-brand-logo">
          <img
            src={imgOykus}
            alt="Oykus"
            width="48"
            height="48"
            className="okp-brand-img"
          />
        </div>
        <span className="okp-brand-name">Oykus</span>
      </a>
    </div>
  );
}
