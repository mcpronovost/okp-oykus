import { useContext } from "react";
import StoreContext from "@/plugins/store";
import { Scrollbars } from "rc-scrollbars";
import OkpUserBanner from "@/components/common/UserBanner";
import imgOykus from "@/assets/img/oykus.jpg";

const CoreSidebar = () => {
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
            </div>
          </Scrollbars>
        </aside>
      )}
    </>
  )
};

export default CoreSidebar;
