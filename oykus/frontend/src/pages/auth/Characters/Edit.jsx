import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import { OkpCard, OkpEmpty, OkpHeading } from "@/components/ui";

export default function OkpAuthCharactersEdit({ data }) {
  const { t } = useTranslation();

  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        <OkpHeading title={t("Your Character")} tag="h1" />
        {data?.character?.length > 0 ? (
          <OkpCard>
            character
          </OkpCard>
        ) : (
          <OkpCard>
            <OkpEmpty
              text={t("No character found")}
            />
          </OkpCard>
        )}
      </div>
    </OkpLayout>
  );
}
