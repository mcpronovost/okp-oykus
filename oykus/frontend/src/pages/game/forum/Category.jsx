import { OkpGameLayout, OkpGameForumCategoryCard } from "@/components/game";

export default function OkpForumCategory({ data }) {
  return (
    <OkpGameLayout data={data}>
      {data?.category && (
        <OkpGameForumCategoryCard category={data.category} standalone />
      )}
    </OkpGameLayout>
  );
}
