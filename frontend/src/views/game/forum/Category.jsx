import { useLoaderData, useParams } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpForumCategory from "@/components/forum/Category";

export async function loader({ params }) {
  const t = getTrans();
  try {
    const url = `${params.slug}/categories/${params.category}/`;
    const req = await fetch(`${api}/forum/${url}`, {
      headers: getHeaders(),
    });
    if (!req.ok) {
      throw req.status;
    }
    const response = await req.json();
    return {
      data: response,
    };
  } catch (e) {
    if (e === 401) throw new Response(t("Unauthorized"), { status: 401 });
    else throw new Response(t("NotFound"), { status: 404 });
  }
}

export default function ForumCategoryView() {
  const { data } = useLoaderData();
  const { slug } = useParams();

  const breadcrumbs = [
    {
      name: data.game.name,
      href: `/g/${slug}`
    }
  ]

  return (
    <>
      <OkpForumCategory category={data} breadcrumbs={breadcrumbs} nolink />
    </>
  );
}
