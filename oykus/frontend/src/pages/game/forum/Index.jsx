import { OkpGameLayout, OkpGameForumCategoryList } from "@/components/game";

export default function OkpGameForumIndex({ data }) {
  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        {data?.forum && (
          <section className="okp-forum-index">
            <OkpGameForumCategoryList categories={data.forum.categories} />
          </section>
        )}
      </section>
    </OkpGameLayout>
  );
}
