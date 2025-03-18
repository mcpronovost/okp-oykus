import { OkpGameLayout, OkpGameForumCategoryCard } from "@/components/game";

export default function OkpForumCategory({ data }) {
  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        {data?.category && (
          <section className="okp-forum-category">
            <OkpGameForumCategoryCard category={data.category} standalone />
          </section>
        )}
      </section>
    </OkpGameLayout>
  );
}
