import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";
import OkpTest from "@/components/test";

export default function HomeView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Home")} />
        <OkpTest />
      </section>
    </>
  );
}
