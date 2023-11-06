import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import CommonUserBanner from "@/components/common/UserBanner";
import imgAvatar from "@/assets/img/oykus.jpg";

const CoreSidebar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen } = useContext(StoreContext);

  return (
    <>
      <aside id="okp-core-sidebar" className={sidebarOpen ? "okp-open" : ""}>
        <section>
          <CommonUserBanner avatar={imgAvatar} banner={imgAvatar} />
        </section>
      </aside>
    </>
  )
};

export default CoreSidebar;
