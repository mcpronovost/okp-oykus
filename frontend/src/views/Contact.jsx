import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";

export default function ContactView() {
  const t = getTrans();

  return (
    <>
      <section className="okp-container">
        <OkpHeader title={t("Contact")} />
        <p>Under construction.</p>
      </section>
    </>
  );
}
