import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function RankingsView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Rankings")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
