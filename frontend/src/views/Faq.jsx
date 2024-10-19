import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function FaqView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("FAQ")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
