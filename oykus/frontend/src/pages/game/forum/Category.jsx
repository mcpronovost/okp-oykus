import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumCategoryCard } from "@/components/game";

export default function OkpGameForumCategory({ data }) {
  return (
    <OkpGameLayout data={data}>
      {data?.category && (
        <section className="okp-forum-category-list">
          <OkpGameForumCategoryCard category={data.category} standalone />
        </section>
      )}
    </OkpGameLayout>
  );
}
