import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumTopicList } from "@/components/game";
import { OkpBreadcrumb, OkpHeading } from "@/components/ui";

export default function OkpGameForumSection({ data }) {
  return (
    <OkpGameLayout data={data}>
      {data?.section && (
        <>
          <div className="okp-grid">
            <OkpHeading title={data.section.title} />
            <OkpBreadcrumb breadcrumb={data.section.breadcrumb} />
          </div>
          <OkpGameForumTopicList topics={data.section.topics} />
        </>
      )}
    </OkpGameLayout>
  );
}
