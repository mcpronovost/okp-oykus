import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";
import OkpHeader from "@/components/common/Header";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <OkpHeader title={t("Rankings")} />
            <p>{t("Under construction.")}</p>
          </div>
        </div>
      </div>
    </>
  )
};

const View = () => {
  return (
    <CoreLayout>
      <Content />
    </CoreLayout>
  )
};

export default View;
