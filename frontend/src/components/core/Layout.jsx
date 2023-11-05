import { useEffect } from "react";
import { Scrollbars } from "rc-scrollbars";
import CoreHeader from "@/components/core/Header";
import CoreNavbar from "@/components/core/Navbar";
import CoreSidebar from "@/components/core/Sidebar";

const CoreLayout = ({ children }) => {

  useEffect(() => {
    console.log("okp init");
    return () => {
      console.log("okp init cleanup");
    };
  }, []);

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
