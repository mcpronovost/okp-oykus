import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumCategoryList } from "@/components/game";

export default function OkpGameForumCategory({ data }) {
  return (
    <OkpGameLayout data={data}>
      {data?.forum && <OkpGameForumCategoryList categories={data.forum.categories} />}
    </OkpGameLayout>
  );
}
