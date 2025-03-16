import { OkpGameLayout } from "@/components/game";
import { OkpError, OkpHeading } from "@/components/common";
import { OkpForumTopicList } from "@/components/forum";

export default function OkpForumSection({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <OkpHeading title={data.section.title} />
      <OkpForumTopicList topics={data.section.topics} />
    </OkpGameLayout>
  );
}
