import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import { OkpCard, OkpEmpty, OkpHeading } from "@/components/ui";

export default function OkpAuthGames({ data }) {
  const { t } = useTranslation();

  console.log(data);

  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        <OkpHeading title={t("Your Games")} tag="h1" />
        {data?.games?.length > 0 ? (
          <OkpCard>
            games
          </OkpCard>
        ) : (
          <OkpCard>
            <OkpEmpty
              text={t("No games found")}
              subtext={t("Create a game to start")}
            />
          </OkpCard>
        )}
      </div>
    </OkpLayout>
  );
}
