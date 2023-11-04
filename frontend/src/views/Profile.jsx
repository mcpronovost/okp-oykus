import { useEffect } from "react";
import { useTranslation, getLang } from "@/plugins/i18n";

const ProfileView = () => {
  const lang = getLang(window.location);
  const t = useTranslation(lang);

  useEffect(() => {
    console.log("Profile page");
  }, []);

  return (
    <>
      <div>
        <h1>{t("Profile")}</h1>
      </div>
    </>
  )
};

export default ProfileView;
