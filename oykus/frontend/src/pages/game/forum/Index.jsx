import { OkpGameLayout, OkpGameForumCategoryList } from "@/components/game";

export default function OkpGameForumIndex({ data }) {
  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        <section className="okp-forum-index">
          {data?.forum && <OkpGameForumCategoryList categories={data.forum.categories} />}
        </section>
      </section>
    </OkpGameLayout>
  );
}
