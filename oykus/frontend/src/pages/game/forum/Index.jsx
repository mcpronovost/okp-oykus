import { OkpGameLayout, OkpGameForumCategoryList } from "@/components/game";
import { OkpError } from "@/components/common";

export default function OkpGameForumIndex({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        <section className="okp-forum-index">
          {data.forum && <OkpGameForumCategoryList categories={data.forum.categories} />}
        </section>
      </section>
    </OkpGameLayout>
  );
}
