import { useLoaderData, useParams } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpHeader from "@/components/common/Header";
import OkpBreadcrumbs from "@/components/common/Breadcrumbs";
import OkpTopicCard from "@/components/forum/TopicCard";

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
  const { slug } = useParams();

  const breadcrumbs = [
    {
      name: data.game.name,
      href: `/g/${slug}`,
    },
    {
      name: data.category.name,
      href: `/g/${data.category.path}`,
    },
    {
      name: data.section.name,
      href: `/g/${data.section.path}`,
    },
  ];

  return (
    <section className="okp-forum-section">
      <OkpHeader title={data.title} subtitle={data.description}>
        <OkpBreadcrumbs crumbs={breadcrumbs} />
      </OkpHeader>
      <section className="okp-forum-section-topics">
        messages
      </section>
    </section>
  );
}
