import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function AchievementsView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Achievements")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
