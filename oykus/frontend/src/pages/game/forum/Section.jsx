import { OkpGameLayout, OkpGameForumTopicList } from "@/components/game";
import { OkpError, OkpHeading } from "@/components/common";

export default function OkpForumSection({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <OkpHeading title={data.section.title} />
      <OkpGameForumTopicList topics={data.section.topics} />
    </OkpGameLayout>
  );
}
