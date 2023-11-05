import { useEffect } from "react";
import { Scrollbars } from "rc-scrollbars";
import CoreHeader from "@/components/core/Header";

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
      <main id="okp-core-main">
        <Scrollbars>
          {children}
        </Scrollbars>
      </main>
    </>
  );
};

export default CoreLayout;
