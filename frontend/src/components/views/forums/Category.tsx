import type { Category } from "@/_libs/types/forums.types";
import React, { useEffect, useState } from "react";
import OkpLoading from "@/components/common/Loading";
import OkpForumCategoryCard from "@/components/forums/CategoryCard";

interface Props {
  slug?: string;
  uri?: string;
}

export default function OkpForumsCategoryView ({ slug, uri }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  async function getForumCategory () {
    setIsLoading(true);
    try {
      const cpk = uri?.match(/^c(\d+)-/)?.[1];
      if (!cpk) throw new Error("Category not found");

      const query = await fetch(`/api/forums/${slug}/categories/${cpk}/`);
      if (!query.ok) throw new Error("Failed to fetch data");
  
      const response = await query.json();
      if (!response) throw new Error("Categories not found");

      setCategory(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForumCategory();
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <div className="okp-grid">
      <section className="okp-forum">
        <section className="okp-forum-categories">
          {(category) && (
            <OkpForumCategoryCard key={category.id} data={category} singleton />
          )}
        </section>
      </section>
    </div>
  );
}
