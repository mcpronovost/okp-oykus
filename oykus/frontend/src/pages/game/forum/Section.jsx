import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumTopicList } from "@/components/game";
import { OkpHeading } from "@/components/common";
import { OkpBreadcrumb } from "@/components/ui";

export default function OkpForumSection({ data }) {
  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        {data?.section && (
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
