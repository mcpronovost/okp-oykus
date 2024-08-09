import { useLoaderData } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpHeader from "@/components/common/Header";
import OkpBreadcrumbs from "@/components/common/Breadcrumbs";

export async function loader({ params }) {
  const t = getTrans();
  try {
    const url = `${params.slug}/topics/${params.topic}/`;
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

export default function ForumTopicView() {
  const { data } = useLoaderData();

  return (
    <section className="okp-forum-section">
      <OkpHeader title={data.title} subtitle={data.description}>
        <OkpBreadcrumbs crumbs={data.breadcrumbs} />
      </OkpHeader>
      <section className="okp-forum-section-topics">
        messages
      </section>
    </section>
  );
}
