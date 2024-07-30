import type { ReactNode } from "react";
import { useContext } from "react";
import { Settings } from "lucide-react";
import { getTrans } from "@/_lib/i18n";
import StoreContext from "@/_lib/store";
import OkpHeader from "@/components/core/_navbar/header";
import OkpMenu from "@/components/core/_navbar/menu";
import OkpFooter from "@/components/core/_navbar/footer";
import Link from "@/components/common/Link";

const t = getTrans();

export default function CoreNavbar(): ReactNode {
  const { toggleNavbar } = useContext(StoreContext);

  return (
    <>
      <nav id="okp-core-navbar" className={`okp-${toggleNavbar ? "open" : "close"}`}>
        <OkpHeader />
        <OkpMenu />
        <OkpFooter />
      </nav>
    </>
  );
}
