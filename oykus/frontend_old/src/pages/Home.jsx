import { t } from "@mcpronovost/okp-i18n";
import { r } from "@mcpronovost/okp-router";

export default function Home() {
  return (
    <section className="okp-grid">
        <header className="okp-header">
            <h1 className="okp-header-title">{t("Home")}</h1>
        </header>
        <section>
            <p>Under construction</p>
            <a href={r("components")}>Go to Components</a>
        </section>
    </section>
  );
}
