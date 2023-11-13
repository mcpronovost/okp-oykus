import { Scrollbars } from "rc-scrollbars";
import CoreHeader from "@/components/core/Header";
import CoreNavbar from "@/components/core/Navbar";
import CoreSidebar from "@/components/core/Sidebar";

const CoreLayout = ({ children, fullview = false }) => {

  return (
    <>
      {(!fullview) && (
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
      )}
      {(fullview) && (
        <>
          <div id="okp-core-content">
            <main id="okp-core-main">
              <Scrollbars>
                <div className="okp-fullview">
                  {children}
                </div>
              </Scrollbars>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default CoreLayout;
