import { useEffect } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";

const CoreNavbar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  useEffect(() => {
    console.log("Navbar view");
    return () => {
      console.log("Navbar view cleanup");
    };
  }, []);

  return (
    <>
      <nav id="okp-core-navbar">
        <p>{t("Navbar")}</p>
      </nav>
    </>
  )
};

export default CoreNavbar;
