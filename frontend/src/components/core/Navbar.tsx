import type { ReactNode } from "react";
import { useContext } from "react";
import { Settings } from "lucide-react";
import { getTrans } from "@/_lib/i18n";
import StoreContext from "@/_lib/store";
import OkpMenu from "@/components/core/_navbar/menu";
import Link from "@/components/common/Link";

const t = getTrans();

export default function CoreNavbar(): ReactNode {
  const { toggleNavbar } = useContext(StoreContext);

  return (
    <>
      <nav id="okp-core-navbar" className={`okp-${toggleNavbar ? "open" : "close"}`}>
        <div>top</div>
        <OkpMenu />
        <footer className="okp-footer">
          <Link href="/settings" className="okp-footer-link">
            <Settings size={24} className="okp-footer-link-icon" />
            <span className="okp-footer-link-name">{t("Settings")}</span>
          </Link>
        </footer>
      </nav>
    </>
  );
}
