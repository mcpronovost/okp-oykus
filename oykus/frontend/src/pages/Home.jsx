import { t } from "@mcpronovost/okp-i18n";
import { r } from "@mcpronovost/okp-router";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>{t("Hello")}</p>
      <a href={r("components")}>Go to Components</a>
    </div>
  );
}
