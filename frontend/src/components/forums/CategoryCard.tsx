import type { Category } from "@/_libs/types/forums.types";
import React, { useEffect, useState } from "react";
import OkpLoading from "@/components/common/Loading";
import OkpNotFound from "@/components/common/NotFound";
import OkpForumHeader from "@/components/forums/common/Header";
import OkpSectionList from "@/components/forums/SectionList";

interface Props {
  slug?: string;
  cpk?: string;
  data?: Category;
  singleton?: boolean;
}

export default function OkpForumCategory ({ slug, cpk, data, singleton }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(data || null);

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
    if (cpk && !category) getForumCategory();
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <article className="okp-forum-category">
      {(category) ? (
        <>
          <OkpForumHeader
            title={category.name}
            description={category.description || undefined}
            path={singleton ? undefined : category.path}
            singleton={singleton}
          />
          <OkpSectionList sections={category.sections} />
        </>
      ) : (cpk) ? (
        <OkpNotFound />
      ) : null}
    </article>
  );
}