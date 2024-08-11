import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function CynostsView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Cynosts")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
