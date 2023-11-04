import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <div>
      <h1>{t("Error")}</h1>
    </div>
  )
};

const ErrorView = () => {
  return (
    <CoreLayout>
      <Content />
    </CoreLayout>
  )
};

export default ErrorView;
