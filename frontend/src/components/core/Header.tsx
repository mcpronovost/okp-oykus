import type { ReactNode } from "react";
import { useContext } from "react";
import { LayoutGrid } from "lucide-react";
import StoreContext from "@/_lib/store";
import OkpBrand from "@/components/core/_header/brand";
import OkpMenu from "@/components/core/_header/menu";
import OkpNotifications from "@/components/core/_header/notifications";
import imgAvatar from "@/_assets/img/mcpk.jpg";

export default function CoreHeader(): ReactNode {
  const { user, toggleNavbar, setToggleNavbar } = useContext(StoreContext);

  const doToggleNavbar = () => {
    setToggleNavbar(!toggleNavbar);
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
      {!!user && <OkpNotifications />}
      {!!user && (
        <div className="okp-user">
          <div className="okp-user-name">
            <span>{user.username}</span>
          </div>
          <div className="okp-user-avatar">
            <img
              src={imgAvatar}
              alt="Kamuy Sinen"
              width="32"
              height="32"
              className="okp-user-avatar-img"
            />
          </div>
        </div>
      )}
      {!user && <div>connexion</div>}
    </header>
  );
}
