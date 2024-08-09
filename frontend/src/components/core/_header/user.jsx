import { useContext } from "react";
import { Link } from "react-router-dom";
import { qpabbr } from "@mcpronovost/qpfilters";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";

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
          <figure className="okp-user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={("User's avatar")} width="32" height="32" className="okp-user-avatar-img" />
            ) : (
              <div className="okp-user-avatar-initial">
                <span>{qpabbr(user.name || user.username)}</span>
              </div>
            )}
          </figure>
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
