import type { ReactNode } from "react";
import { getTrans } from "@/_lib/i18n";
import Link from "@/components/common/Link";
import imgOykus from "@/_assets/img/oykus-w.png";

export default function HeaderBrand(): ReactNode {
  const t = getTrans();

  return (
    <div className="okp-brand">
      <Link href="/" className="okp-brand-link">
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
