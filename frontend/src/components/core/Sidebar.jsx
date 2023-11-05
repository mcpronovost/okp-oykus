import { getTranslation, getLang } from "@/plugins/i18n";

const CoreSidebar = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <aside id="okp-core-sidebar">
        <p>{t("Sidebar")}</p>
      </aside>
    </>
  )
};

export default CoreSidebar;
