import type { Category } from "@/_libs/types/forums.types";
import { useContext, useEffect, useState } from "react";
import { RouterContext } from "@/_libs/stores/RouterContext";
import OkpLoading from "@/components/common/Loading";
import OkpForumCategoryCard from "@/components/forums/CategoryCard";

export default function OkpForumCategoryList () {
  const { gameRoute } = useContext(RouterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  async function getForumCategories () {
    setIsLoading(true);
    try {
      const query = await fetch(`/api/forums/${gameRoute}/categories/`);
      if (!query.ok) throw new Error("Failed to fetch data");
  
      const response = await query.json();
      if (!response) throw new Error("Categories not found");

      setCategories(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForumCategories();
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <section className="okp-forum-categories">
      {categories.map((item) => (
        <OkpForumCategoryCard key={item.id} data={item} />
      ))}
    </section>
  );
}
