import { useEffect } from "react";
import { Scrollbars } from "rc-scrollbars";
import CoreNavbar from "@/components/core/Navbar";
import CoreFooter from "@/components/core/Footer";

const CoreLayout = ({ children }) => {

  useEffect(() => {
    console.log("okp init");
    return () => {
      console.log("okp init cleanup");
    };
  }, []);

  return (
    <>
      <CoreNavbar />
      <main id="okp-core-main">
        <Scrollbars>
          {children}
          <CoreFooter />
        </Scrollbars>
      </main>
    </>
  );
};

export default CoreLayout;
