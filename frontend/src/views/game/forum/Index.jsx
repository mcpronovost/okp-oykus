import { useLoaderData } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpForumCategory from "@/components/forum/Category";

export async function loader({ params }) {
  const t = getTrans();
  try {
    const req = await fetch(`${api}/forum/${params.slug}/index/`, {
      headers: getHeaders(),
    });
    if (!req.ok) {
      throw req.status;
    }
    const response = await req.json();
    return {
      data: response
    };
  } catch (e) {
    if (e === 401) throw new Response(t("Unauthorized"), { status: 401 });
    else throw new Response(t("NotFound"), { status: 404 });
  }
}

export default function ForumIndexView() {
  const { data } = useLoaderData();

  return (
    <section className="okp-forum-index">
      {data.categories.map((category) => {
        return (
          <OkpForumCategory key={`forum-category-${category.id}`} category={category} />
        )
      })}
    </section>
  );
}
