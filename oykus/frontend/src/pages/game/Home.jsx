import { OkpGameLayout } from "@/components/game";
import { OkpGameForumCategoryList } from "@/components/game";

export default function OkpGameHome({ data }) {
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
