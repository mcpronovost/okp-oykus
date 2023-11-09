import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <section className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{t("Rankings")}</h1>
          </div>
        </div>
      </div>
    </section>
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
