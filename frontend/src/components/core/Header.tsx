import type { ReactNode } from "react";
import { useContext } from "react";
import { LayoutGrid } from "lucide-react";
import StoreContext from "@/_lib/store";
import OkpBrand from "@/components/core/_header/brand";
import OkpMenu from "@/components/core/_header/menu";
import OkpNotifications from "@/components/core/_header/notifications";

export default function CoreHeader(): ReactNode {
  const { toggleNavbar, setToggleNavbar } = useContext(StoreContext);

  const doToggleNavbar = () => {
    setToggleNavbar(!toggleNavbar);
  };

  return (
    <>
      <header id="okp-core-header">
        <OkpBrand />
        <div className="okp-toggle-navbar">
          <button onClick={doToggleNavbar} className="okp-toggle-navbar-btn">
            <LayoutGrid size={24} />
          </button>
        </div>
        <OkpMenu />
        <div className="okp-space"></div>
        <OkpNotifications />
      </header>
    </>
  );
}
