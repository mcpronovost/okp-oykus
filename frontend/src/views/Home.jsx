import { useEffect } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";

const HomeView = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  useEffect(() => {
    console.log("Home view");
  }, []);

  return (
    <CoreLayout>
      <div>
        <h1>{t("Home")}</h1>
      </div>
    </CoreLayout>
  )
};

export default HomeView;
