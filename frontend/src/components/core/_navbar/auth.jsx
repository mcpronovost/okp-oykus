import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";

export default function NavbarHeader() {
  const { user } = useContext(StoreContext);
  const t = getTrans();

  return (
    <header className="okp-header">
      <section className="okp-header-banner">
        <figure className="okp-header-banner-cover"></figure>
        <figure className="okp-header-banner-avatar">
          <div className="okp-header-banner-avatar-icon">
            <User />
          </div>
        </figure>
      </section>
      <section className="okp-header-info">
        <Link to={t("/signup")} className="okp-header-info-signup">
          <span>Inscription</span>
        </Link>
        <Link to={t("/login")} className="okp-header-info-login">
          <span>Connexion</span>
        </Link>
      </section>
    </header>
  );
}
