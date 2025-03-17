import { OkpGameLayout, OkpGameForumTopicList } from "@/components/game";
import { OkpError, OkpHeading } from "@/components/common";
import { OkpBreadcrumb } from "@/components/ui";

export default function OkpForumSection({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        {data.section && (
          <section className="okp-forum-section">
            <OkpHeading title={data.section.title} />
            <OkpBreadcrumb breadcrumb={data.section.breadcrumb} />
            <OkpGameForumTopicList topics={data.section.topics} />
          </section>
        )}
      </section>
    </OkpGameLayout>
  );
}
