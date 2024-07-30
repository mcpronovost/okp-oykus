import type { ReactNode } from "react";
import { Settings } from "lucide-react";
import { getTrans } from "@/_lib/i18n";
import Link from "@/components/common/Link";

const t = getTrans();

export default function NavbarFooter(): ReactNode {
  return (
    <footer className="okp-footer">
      <Link href="/settings" className="okp-footer-link">
        <Settings size={24} className="okp-footer-link-icon" />
        <span className="okp-footer-link-name">{t("Settings")}</span>
      </Link>
    </footer>
  );
}
