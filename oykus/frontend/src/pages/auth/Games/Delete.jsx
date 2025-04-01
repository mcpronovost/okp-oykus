import { useTranslation } from "@/services/translation";
import { OkpAuthGamesLayout } from "@/components/layout";
import { OkpAlert, OkpCard } from "@/components/ui";

export default function OkpAuthGamesDelete({ data }) {
  const { t } = useTranslation();

  return (
    <OkpAuthGamesLayout data={data} activeItem="deletion">
      <OkpCard padding={24}>
        <OkpAlert
          message={t("Are you sure you want to delete this game?")}
          description={t("This action is not possible yet.")}
          type="error"
        />
      </OkpCard>
    </OkpAuthGamesLayout>
  );
}
