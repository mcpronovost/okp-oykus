// import "@/assets/styles/forum/categoryList.scss";
import { OkpForumCategoryCard } from "@/components/forum";

export default function OkpForumCategoryList({ categories, className }) {
  if (!categories) return null;

  return (
    <section className={`okp-forum-categories-list ${className}`}>
      {categories.map((category) => (
        <OkpForumCategoryCard key={category.id} category={category} tag="article" />
      ))}
    </section>
  );
}
