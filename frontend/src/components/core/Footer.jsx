import { getTranslation, getLang } from "@/plugins/i18n";

const CoreFooter = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <footer id="okp-core-footer">
        <p>{t("Footer")}</p>
      </footer>
    </>
  )
};

export default CoreFooter;
