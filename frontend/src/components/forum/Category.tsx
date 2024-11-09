import type { Category } from "@/types/forums.types";
import React, { useEffect, useState } from "react";
import OkpLoading from "@/components/ui/Loading";
import OkpForumCategoryCard from "@/components/forum/CategoryCard";

export default function OkpForumIndex ({ slug, cpk }: { slug: string, cpk: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  async function getForumCategory () {
    setIsLoading(true);
    try {
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
