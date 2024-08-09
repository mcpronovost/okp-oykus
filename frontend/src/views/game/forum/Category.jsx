import { useLoaderData } from "react-router-dom";
import { api, getHeaders } from "@/_lib/api";
import OkpForumCategory from "@/components/forum/Category";

export async function loader({ params }) {
  if (!params.slug) return;
  try {
    const url = `${params.slug}/categories/${params.category}`;
    const req = await fetch(`${api}/forum/${url}`, {
      headers: getHeaders(),
    });
    if (!req.ok) {
      throw req.status;
    }
    const response = await req.json();
    return {
      category: response,
    };
  } catch (e) {
    return;
  }
}

export default function ForumCategoryView() {
  const { category } = useLoaderData();

  return (
    <>
      <OkpForumCategory category={category} />
    </>
  );
}
