import { OkpHeading } from "@/components/common";
import { OkpForumSectionList } from "@/components/forum";

export default function OkpForumCategoryCard({ category, tag = "section" }) {
  if (!category) return null;

  const OkpCategoryTag = tag;

  return (
    <OkpCategoryTag className="okp-forum-category" key={category.id}>
      <OkpHeading title={category.title} link={category.url} className="okp-forum-category-title" />
      <OkpForumSectionList sections={category.sections} className="okp-forum-category-sections" />
    </OkpCategoryTag>
  );
}
