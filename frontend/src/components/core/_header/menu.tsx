import type { ReactNode } from "react";
import { getTrans } from "@/_lib/i18n";
import Link from "@/components/common/Link";

const t = getTrans();

export default function HeaderMenu(): ReactNode {
  return (
    <nav className="okp-menu">
      <ul>
        <li>
          <Link href="/devblog" className="okp-menu-link">
            {t("Devblog")}
          </Link>
        </li>
        <li>
          <Link href="/faq" className="okp-menu-link">
            {t("FAQ")}
          </Link>
        </li>
        <li>
          <Link href="/contact" className="okp-menu-link">
            {t("Contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
