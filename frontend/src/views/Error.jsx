import { useEffect } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";

const ErrorView = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  useEffect(() => {
    console.log("Error view");
  }, []);

  return (
    <CoreLayout>
      <div>
        <h1>{t("Error")}</h1>
      </div>
    </CoreLayout>
  )
};

export default ErrorView;
