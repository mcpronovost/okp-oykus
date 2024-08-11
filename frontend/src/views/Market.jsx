import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function MarketView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Market")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
