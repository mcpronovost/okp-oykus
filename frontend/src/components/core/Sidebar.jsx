import { useContext } from "react";
import StoreContext from "@/_lib/store";

export default function CoreSidebarComponent() {
  const { toggleSidebar } = useContext(StoreContext);

  return (
    <nav id="okp-core-sidebar" className={`okp-${toggleSidebar ? "open" : "close"}`}>
      <div>top</div>
      <div>mid</div>
      <div>bot</div>
    </nav>
  );
}
