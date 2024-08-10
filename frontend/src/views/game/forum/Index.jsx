import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpLoading from "@/components/common/Loading";
import OkpForumCategory from "@/components/forum/Category";

export default function ForumIndexView() {
  const params = useParams();
  const t = getTrans();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState(null);

  async function getData () {
    try {
      const req = await fetch(`${api}/forum/${params.slug}/index/`, {
        headers: getHeaders(),
      });
      if (!req.ok) {
        throw req.status;
      }
      const response = await req.json();
      return setData(response);
    } catch (e) {
      setHasError("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  return (
    <section className="okp-forum-index">
      {(!hasError && !isLoading && !!data) ? data.categories.map((category) => {
        return (
          <OkpForumCategory key={`forum-category-${category.id}`} category={category} />
        )
      }) : (!hasError && !isLoading) ? (
        <div>vide</div>
      ) : (!hasError && isLoading) ? (
        <OkpLoading />
      ) : (
        <div>{hasError}</div>
      )}
    </section>
  );
}
