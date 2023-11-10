import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import { Scrollbars } from "rc-scrollbars";
import CommonUserBanner from "@/components/common/UserBanner";
import imgOykus from "@/assets/img/oykus.jpg";

const CoreSidebar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen } = useContext(StoreContext);

  return (
    <aside id="okp-core-sidebar" className={sidebarOpen ? "okp-open" : ""}>
      <Scrollbars>
        <div id="okp-core-sidebar-wrapper">
          <section id="okp-sidebar-user-info">
            <CommonUserBanner height={180} banner={imgOykus} avatarSize={120} bannerSize={72} />
            <h2>M-C Pronovost</h2>
          </section>
        </div>
      </Scrollbars>
    </aside>
  )
};

export default CoreSidebar;
