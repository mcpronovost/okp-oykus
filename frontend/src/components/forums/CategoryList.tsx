import type { Category } from "@/_libs/types/forums.types";
import { useContext, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { I18nContext } from "@/_libs/stores/I18nContext";
import { RouterContext } from "@/_libs/stores/RouterContext";
import OkpLoading from "@/components/common/Loading";
import OkpForumCategoryCard from "@/components/forums/CategoryCard";

export default function OkpForumCategoryList () {
  const { t } = useContext(I18nContext);
  const { gameSlug } = useContext(RouterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  async function getForumCategories () {
    setIsLoading(true);
    try {
      const query = await fetch(`/api/forums/${gameSlug}/categories/`);
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
      {categories.length ? categories.map((item) => (
        <OkpForumCategoryCard key={item.id} data={item} />
      )) : (
        <div className="okp-forum-notfound">
          <div className="okp-forum-notfound-wrapper">
            <AlertCircle className="icon" />
            <h2>{t("No Categories Found")}</h2>
            <p>{t("It seems there are no categories available at the moment.")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
