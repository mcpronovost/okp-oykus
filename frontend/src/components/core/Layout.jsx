import { Scrollbars } from "rc-scrollbars";
import CoreHeader from "@/components/core/Header";
import CoreNavbar from "@/components/core/Navbar";
import CoreSidebar from "@/components/core/Sidebar";

const CoreLayout = ({ children }) => {

  return (
    <>
      <CoreHeader />
      <div id="okp-core-content">
        <CoreNavbar />
        <main id="okp-core-main">
          <Scrollbars>
            {children}
          </Scrollbars>
        </main>
        <CoreSidebar />
      </div>
    </>
  );
};

export default CoreLayout;
