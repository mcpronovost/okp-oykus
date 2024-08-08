import { useContext } from "react";
import { Link } from "react-router-dom";
import { qpabbr } from "@mcpronovost/qpfilters";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";

export default function NavbarHeader() {
  const { user } = useContext(StoreContext);
  const t = getTrans();

  return (
    <header className="okp-header">
      <section className="okp-header-banner">
        <figure className="okp-header-banner-cover">
          {user.avatar && (
            <img src={imgAvatar} alt={t("User's banner")} className="okp-header-banner-cover-img" />
          )}
        </figure>
        <figure className="okp-header-banner-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={("User's avatar")} className="okp-header-banner-avatar-img" />
          ) : (
            <div className="okp-header-banner-avatar-initial">
              <span>{qpabbr(user.name || user.username)}</span>
            </div>
          )}
        </figure>
      </section>
      <section className="okp-header-info">
        <div className="okp-header-info-name">
          <span>{user.name || user.username}</span>
        </div>
        <div className="okp-header-info-title">
          <span>@{user.username}</span>
        </div>
      </section>
      <section className="okp-header-counts">
        <ul>
          <li>
            <span>0</span> <span>{t("messages")}</span>
          </li>
          <li>
            <span>0</span> <span>{t("topics")}</span>
          </li>
          <li>
            <span>0</span> <span>{t("achievements")}</span>
          </li>
        </ul>
      </section>
    </header>
  );
}
