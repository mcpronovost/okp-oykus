import type { ReactNode } from "react";
import { useContext } from "react";
import { getTrans } from "@/_lib/i18n";
import StoreContext from "@/_lib/store";
import Link from "@/components/common/Link";
import imgAvatar from "@/_assets/img/mcpk.jpg";

const t = getTrans();

export default function NavbarHeader(): ReactNode {
  const { user } = useContext(StoreContext);

  return (
    <header className="okp-header">
      <section className="okp-header-banner">
        <figure className="okp-header-banner-cover">
          <img src={imgAvatar} alt={t("User's banner")} className="okp-header-banner-cover-img" />
        </figure>
        <figure className="okp-header-banner-avatar">
          <img src={imgAvatar} alt={("User's avatar")} className="okp-header-banner-avatar-img" />
        </figure>
      </section>
      <section className="okp-header-info">
        <div className="okp-header-info-name">
          <span>{user.name}</span>
        </div>
        <div className="okp-header-info-title">
          <span>@{user.username}</span>
        </div>
      </section>
      <section className="okp-header-counts">
        <ul>
          <li>
            <span>9 999 999</span> <span>messages</span>
          </li>
          <li>
            <span>99 999</span> <span>topics</span>
          </li>
          <li>
            <span>99 999</span> <span>succès</span>
          </li>
        </ul>
      </section>
    </header>
  );
}
