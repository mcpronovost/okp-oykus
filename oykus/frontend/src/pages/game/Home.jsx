import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumCategoryList } from "@/components/game";

export default function OkpGameHome({ data }) {
  console.log("data", data);
  return (
    <OkpGameLayout data={data}>
      {data?.forum && <OkpGameForumCategoryList categories={data.forum.categories} />}
    </OkpGameLayout>
  );
}
