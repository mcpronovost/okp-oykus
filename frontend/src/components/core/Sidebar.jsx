import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import { Scrollbars } from "rc-scrollbars";
import OkpRouteLink from "@/components/common/RouteLink.jsx";
import OkpUserBanner from "@/components/common/UserBanner";
import imgOykus from "@/assets/img/oykus.jpg";

const CoreSidebar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { user, sidebarOpen } = useContext(StoreContext);

  return (
    <>
      {(user) && (
        <aside id="okp-core-sidebar" className={sidebarOpen ? "okp-open" : ""}>
          <Scrollbars>
            <div id="okp-core-sidebar-wrapper">
              <section id="okp-sidebar-user-info">
                <OkpUserBanner height={200} avatar={user.avatar || null} banner={user.avatar || imgOykus} avatarSize={120} bannerSize={120} />
                <h2>{user.name}</h2>
              </section>
              <section id="okp-sidebar-user-menu">
                <OkpRouteLink route={`/${lang}${t("/auth/logout")}/`} classes="okp-sidebar-btn-logout" children={t("Logout")} />
              </section>
            </div>
          </Scrollbars>
        </aside>
      )}
    </>
  )
};

export default CoreSidebar;
