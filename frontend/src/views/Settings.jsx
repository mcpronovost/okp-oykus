import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function SettingsView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Settings")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
