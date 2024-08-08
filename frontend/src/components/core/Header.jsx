import { LayoutGrid } from "lucide-react";
import OkpBrand from "@/components/core/_header/brand";
import OkpMenu from "@/components/core/_header/menu";
import OkpNotifications from "@/components/core/_header/notifications";
import OkpUser from "@/components/core/_header/user";

export default function CoreHeaderComponent() {

  const doToggleNavbar = () => {
    console.log("doToggleNavbar");
    // setToggleNavbar(!toggleNavbar);
  };

  return (
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
      <OkpUser />
    </header>
  );
}
