import { useEffect } from "react";
import { useTranslation, getLang } from "@/plugins/i18n";

const ErrorView = () => {
  const lang = getLang(window.location);
  const t = useTranslation(lang);

  useEffect(() => {
    console.log("Error page");
  }, []);

  return (
    <>
      <div>
        <h1>{t("Error")}</h1>
      </div>
    </>
  )
};

export default ErrorView;
