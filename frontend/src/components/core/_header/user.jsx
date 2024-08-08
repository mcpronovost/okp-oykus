import { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";
import imgAvatar from "@/_assets/img/mcpk.jpg";

export default function HeaderUser() {
  const { user } = useContext(StoreContext);
  const t = getTrans();

  return (
    <>
      {!!user && (
        <div className="okp-user">
          <div className="okp-user-name">
            <span>
              <Link to={t("/logout")} className="okp-menu-link">
                {t("Logout")}
              </Link>
            </span>
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
      {!user && (
        <div>
          <Link to={t("/login")} className="okp-menu-link">
            {t("Login")}
          </Link>
        </div>
      )}
    </>
  );
}
