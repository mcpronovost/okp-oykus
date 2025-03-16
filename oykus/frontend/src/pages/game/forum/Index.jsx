import { OkpGameLayout } from "@/components/game";
import { OkpError } from "@/components/common";
import { OkpForumCategoryList } from "@/components/forum";

export default function OkpForumIndex({ data }) {
  if (!data) return <OkpError />;

  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        <section className="okp-forum-index">
          {data.forum && <OkpForumCategoryList categories={data.forum.categories} />}
        </section>
      </section>
    </OkpGameLayout>
  );
}
