import { OkpBreadcrumb, OkpHeading } from "@/components/ui";
import { OkpGameForumSectionList } from "@/components/game";

export default function OkpGameForumCategoryCard({ category, tag = "section", standalone = false }) {
  if (!category) return null;

  const OkpCategoryTag = tag;

  return (
    <OkpCategoryTag className="okp-forum-category-card" key={category.id}>
      <OkpHeading title={category.title} link={standalone ? null : category.url} className="okp-forum-category-title" />
      {standalone && <OkpBreadcrumb items={category.breadcrumb} />}
      <OkpGameForumSectionList sections={category.sections} className="okp-forum-category-sections" />
    </OkpCategoryTag>
  );
}
