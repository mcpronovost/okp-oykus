import { Construction } from "lucide-react";
import { useTranslation } from "@/services/translation";
import { OkpGameLayout } from "@/components/layout";
import { OkpCard, OkpEmpty, OkpHeading } from "@/components/ui";

export default function OkpGameCommunityCharacterProfile({ data }) {
  const { t } = useTranslation();

  return (
    <OkpGameLayout data={data}>
      <section className="okp-grid" style={{ marginTop: "24px" }}>
        <OkpHeading title={data.character.name} />
        <OkpCard>
          <OkpEmpty text={t("Page is under construction")} subtext={t("Please come back later")} icon={<Construction size={32} />} />
        </OkpCard>
      </section>
    </OkpGameLayout>
  );
}
