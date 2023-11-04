import CoreNavbar from "@/components/core/Navbar";
import CoreFooter from "@/components/core/Footer";

const CoreLayout = (props) => {
  const { children } = props;

  return (
    <>
      <CoreNavbar />
      <main id="okp-core-main">
        {children}
      </main>
      <CoreFooter />
    </>
  );
};

export default CoreLayout;
