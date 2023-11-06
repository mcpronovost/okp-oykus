import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";

const CoreSidebar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen } = useContext(StoreContext);

  return (
    <>
      <aside id="okp-core-sidebar" className={sidebarOpen ? "okp-open" : ""}>
        <p>{t("Sidebar")}</p>
      </aside>
    </>
  )
};

export default CoreSidebar;
