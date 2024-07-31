import type { ReactNode } from "react";
import {
  Award,
  BarChart3,
  Orbit,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import { Scrollbars } from "rc-scrollbars";
import { getTrans } from "@/_lib/i18n";
import Link from "@/components/common/Link";

const t = getTrans();

export default function NavbarMenu(): ReactNode {
  return (
    <nav className="okp-menu">
      <Scrollbars style={{ height: "100%" }} autoHide>
        <ul>
          <li>
            <Link href="/cynosts" className="okp-menu-link">
              <Orbit size={24} className="okp-menu-link-icon" />
              <span className="okp-menu-link-name">{t("Cynosts")}</span>
            </Link>
          </li>
          <li>
            <Link href="/community" className="okp-menu-link">
              <UsersRound size={24} className="okp-menu-link-icon" />
              <span className="okp-menu-link-name">{t("Community")}</span>
            </Link>
          </li>
          <li>
            <Link href="/achievements" className="okp-menu-link">
              <Award size={24} className="okp-menu-link-icon" />
              <span className="okp-menu-link-name">{t("Achievements")}</span>
            </Link>
          </li>
          <li>
            <Link href="/rankings" className="okp-menu-link">
              <BarChart3 size={24} className="okp-menu-link-icon" />
              <span className="okp-menu-link-name">{t("Rankings")}</span>
            </Link>
          </li>
          <li>
            <Link href="/market" className="okp-menu-link">
              <ShoppingBasket size={24} className="okp-menu-link-icon" />
              <span className="okp-menu-link-name">{t("Market")}</span>
            </Link>
          </li>
        </ul>
      </Scrollbars>
    </nav>
  );
}
