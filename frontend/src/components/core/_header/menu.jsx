import { Link } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";

export default function HeaderMenu() {
  const t = getTrans();

  return (
    <nav className="okp-menu">
      <ul>
        <li>
          <Link to={t("/devblog")} className="okp-menu-link">
            {t("Devblog")}
          </Link>
        </li>
        <li>
          <Link to={t("/faq")} className="okp-menu-link">
            {t("FAQ")}
          </Link>
        </li>
        <li>
          <Link to={t("/contact")} className="okp-menu-link">
            {t("Contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
