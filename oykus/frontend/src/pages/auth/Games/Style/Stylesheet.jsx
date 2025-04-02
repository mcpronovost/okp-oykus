import { useTranslation } from "@/services/translation";
import { OkpAuthGamesLayout } from "@/components/layout";
import { OkpAlert, OkpCard } from "@/components/ui";

export default function OkpAuthGamesStyleStylesheet({ data }) {
  const { t } = useTranslation();

  return (
    <OkpAuthGamesLayout data={data} defaultActiveKey={3} activeItem="style-stylesheet">
      <OkpCard padding={24}>
        <OkpAlert
          message={t("This action is not available yet.")}
          type="error"
        />
      </OkpCard>
    </OkpAuthGamesLayout>
  );
}
