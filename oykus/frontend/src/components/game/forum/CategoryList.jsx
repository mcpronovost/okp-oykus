import "@/assets/styles/forum/categoryList.scss";
import { OkpGameForumCategoryCard } from "@/components/game";

export default function OkpGameForumCategoryList({ categories, className = "" }) {
  if (!categories) return null;

  return (
    <section className={`okp-forum-category-list ${className}`}>
      {categories.map((category) => (
        <OkpGameForumCategoryCard key={category.id} category={category} tag="article" />
      ))}
    </section>
  );
}
