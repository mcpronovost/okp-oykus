import type { ReactNode } from "react";
import { useContext } from "react";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";
import Link from "@/components/common/Link";
import imgAvatar from "@/_assets/img/mcpk.jpg";

const t = getTrans();

export default function HeaderUser(): ReactNode {
  const { user } = useContext(StoreContext);

  return (
    <>
      {!!user && (
        <div className="okp-user">
          <div className="okp-user-name">
            <span>
              <Link href="/logout" className="okp-menu-link">
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
          <Link href="/login" className="okp-menu-link">
            {t("Login")}
          </Link>
        </div>
      )}
    </>
  );
}
