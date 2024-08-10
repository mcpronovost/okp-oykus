import { useContext } from "react";
import StoreContext from "@/_lib/store";
import OkpHeader from "@/components/core/_navbar/header";
import OkpAuth from "@/components/core/_navbar/auth";
import OkpMenu from "@/components/core/_navbar/menu";
import OkpFooter from "@/components/core/_navbar/footer";

export default function CoreNavbarComponent() {
  const { user, toggleNavbar } = useContext(StoreContext);

  return (
    <nav id="okp-core-navbar" className={`okp-${toggleNavbar ? "open" : "close"}`}>
      {!!user ? <OkpHeader /> : <OkpAuth />}
      <OkpMenu />
      <OkpFooter />
    </nav>
  );
}
