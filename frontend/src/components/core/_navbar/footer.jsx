import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { getTrans } from "@/_lib/i18n";

export default function NavbarFooter() {
  const t = getTrans();

  return (
    <footer className="okp-footer">
      <Link to="/settings" className="okp-footer-link">
        <Settings size={24} className="okp-footer-link-icon" />
        <span className="okp-footer-link-name">{t("Settings")}</span>
      </Link>
    </footer>
  );
}
