import { OkpGameForumCategoryCard } from "@/components/game";

export default function OkpGameForumCategoryList({ categories, className }) {
  if (!categories) return null;

  return (
    <section className={`okp-forum-categories-list ${className}`}>
      {categories.map((category) => (
        <OkpGameForumCategoryCard key={category.id} category={category} tag="article" />
      ))}
    </section>
  );
}
