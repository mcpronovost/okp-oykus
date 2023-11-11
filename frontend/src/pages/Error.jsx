import { getTranslation, getLang } from "@/plugins/i18n";
import OkpLayout from "@/components/core/Layout";
import OkpHeader from "@/components/common/Header";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <OkpHeader title={t("Error")} />
            <p>{t("An error occurred.")}</p>
          </div>
        </div>
      </div>
    </>
  )
};

const View = () => {
  return (
    <OkpLayout>
      <Content />
    </OkpLayout>
  )
};

export default View;
