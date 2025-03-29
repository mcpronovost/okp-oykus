import { useTranslation } from "@/services/translation";
import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumTopicList } from "@/components/game";
import { OkpBreadcrumb, OkpButton, OkpHeading } from "@/components/ui";

function OkpBreadcrumbActions({ breadcrumb }) {
  const { t } = useTranslation();

  return (
    <div className="okp-forum-breadtions">
      <div className="okp-forum-breadtions-breadcrumb">
        <OkpBreadcrumb breadcrumb={breadcrumb} />
      </div>
      <div className="okp-forum-breadtions-actions">
        <OkpButton>{t("New Topic")}</OkpButton>
      </div>
    </div>
  );
}

export default function OkpGameForumSection({ data }) {
  return (
    <OkpGameLayout data={data}>
      {data?.section && (
        <section className="okp-forum-section">
          <OkpHeading title={data.section.title} />
          <OkpBreadcrumbActions breadcrumb={data.section.breadcrumb} />
          <OkpGameForumTopicList topics={data.section.topics} />
        </section>
      )}
    </OkpGameLayout>
  );
}
