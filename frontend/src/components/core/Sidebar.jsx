import { useContext } from "react";
import StoreContext from "@/_lib/store";
import OkpCharacters from "@/components/core/_sidebar/characters";
import OkpPopular from "@/components/core/_sidebar/popular";

export default function CoreSidebarComponent() {
  const { user, toggleSidebar } = useContext(StoreContext);

  return (
    <nav id="okp-core-sidebar" className={`okp-${toggleSidebar ? "open" : "close"}`}>
      <div>
        {!!user && <OkpCharacters />}
        <OkpPopular />
      </div>
      <div></div>
      <div></div>
    </nav>
  );
}
