import { useContext } from "react";
import StoreContext from "@/_lib/store";
import OkpHeader from "@/components/core/_navbar/header";
import OkpMenu from "@/components/core/_navbar/menu";
import OkpFooter from "@/components/core/_navbar/footer";

export default function CoreNavbarComponent() {
  const { toggleNavbar } = useContext(StoreContext);

  return (
    <nav id="okp-core-navbar" className={`okp-${toggleNavbar ? "open" : "close"}`}>
      <OkpHeader />
      <OkpMenu />
      <OkpFooter />
    </nav>
  );
}
