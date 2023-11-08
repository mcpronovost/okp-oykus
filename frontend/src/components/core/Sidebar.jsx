import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import CommonUserBanner from "@/components/common/UserBanner";
import imgOykus from "@/assets/img/oykus.jpg";

const CoreSidebar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen } = useContext(StoreContext);

  return (
    <>
      <aside id="okp-core-sidebar" className={sidebarOpen ? "okp-open" : ""}>
        <section id="okp-sidebar-user-info">
          <CommonUserBanner height={180} banner={imgOykus} avatarSize={120} bannerSize={72} />
          <h2>M-C Pronovost</h2>
        </section>
      </aside>
    </>
  )
};

export default CoreSidebar;
