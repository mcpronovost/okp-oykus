import type { ReactNode } from "react";
import { useContext } from "react";
import StoreContext from "@/_lib/store";

export default function CoreNavbar(): ReactNode {
  const { toggleNavbar } = useContext(StoreContext);

  return (
    <>
      <nav id="okp-core-navbar" className={`okp-${toggleNavbar ? "open" : "close"}`}>
        <div>top</div>
        <div>mid</div>
        <div>bot</div>
      </nav>
    </>
  );
}
