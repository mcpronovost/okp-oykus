import { useContext } from "react";
// import StoreContext from "@/_lib/store";
// import { getTrans } from "@/_lib/i18n";
import imgAvatar from "@/_assets/img/mcpk.jpg";

export default function HeaderUser() {
  // const { user } = useContext(StoreContext);
  const user = {};

  return (
    <>
      {!!user && (
        <div className="okp-user">
          <div className="okp-user-name">
            <span>
              <a href="/logout" className="okp-menu-link">
                Logout
              </a>
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
          <Link href="/login" className="okp-menu-link">
            Login
          </Link>
        </div>
      )}
    </>
  );
}
