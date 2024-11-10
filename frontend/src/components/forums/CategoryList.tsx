import type { Category } from "@/_libs/types/forums.types";
import React, { useEffect, useState } from "react";
import OkpLoading from "@/components/common/Loading";
import OkpForumCategoryCard from "@/components/forums/CategoryCard";

interface Props {
  slug?: string;
}

export default function OkpForumCategoryList ({ slug }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  async function getForumCategories () {
    setIsLoading(true);
    try {
      const query = await fetch(`/api/forums/${slug}/categories/`);
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
