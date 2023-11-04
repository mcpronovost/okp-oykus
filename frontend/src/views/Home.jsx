import { useEffect } from "react";
import { useTranslation, getLang } from "@/plugins/i18n";

const HomeView = () => {
  const lang = getLang(window.location);
  const t = useTranslation(lang);

  useEffect(() => {
    console.log("Home page");
  }, []);

  return (
    <>
      <div>
        <h1>{t("Home")}</h1>
      </div>
    </>
  )
};

export default HomeView;
