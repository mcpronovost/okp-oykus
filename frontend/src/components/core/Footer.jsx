import { useEffect } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";

const CoreFooter = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  useEffect(() => {
    console.log("Footer view");
    return () => {
      console.log("Footer view cleanup");
    };
  }, []);

  return (
    <>
      <footer id="okp-core-footer">
        <p>{t("Footer")}</p>
      </footer>
    </>
  )
};

export default CoreFooter;
