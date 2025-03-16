import { OkpGameLayout } from "@/components/game";
import { OkpError } from "@/components/common";
import { OkpForumCategoryCard } from "@/components/forum";

export default function OkpForumCategory({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <OkpForumCategoryCard category={data.category} />
    </OkpGameLayout>
  );
}
