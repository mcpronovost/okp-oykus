import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import { OkpCard, OkpEmpty, OkpHeading } from "@/components/ui";

export default function OkpAuthCharacters({ data }) {
  const { t } = useTranslation();

  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        <OkpHeading title={t("Your Characters")} tag="h1" />
        {data?.characters?.length > 0 ? (
          <OkpCard>
            characters
          </OkpCard>
        ) : (
          <OkpCard>
            <OkpEmpty
              text={t("No characters found")}
              subtext={t("Create a new character to start")}
            />
          </OkpCard>
        )}
      </div>
    </OkpLayout>
  );
}
