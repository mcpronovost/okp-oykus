import { OkpGameLayout, OkpGameForumCategoryCard } from "@/components/game";
import { OkpError } from "@/components/common";

export default function OkpForumCategory({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <OkpGameForumCategoryCard category={data.category} standalone />
    </OkpGameLayout>
  );
}
