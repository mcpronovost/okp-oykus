import { getTranslation, getLang } from "@/plugins/i18n";

const CoreNavbar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <nav id="okp-core-navbar">
        <p>{t("Navbar")}</p>
      </nav>
    </>
  )
};

export default CoreNavbar;
