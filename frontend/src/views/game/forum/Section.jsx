import { useLoaderData } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpHeader from "@/components/common/Header";
import OkpBreadcrumbs from "@/components/common/Breadcrumbs";
import OkpForumSectionCard from "@/components/forum/SectionCard";
import OkpTopicCard from "@/components/forum/TopicCard";

export async function loader({ params }) {
  const t = getTrans();
  try {
    const url = `${params.slug}/sections/${params.section}/`;
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

export default function ForumSectionView() {
  const { data } = useLoaderData();
  const t = getTrans();

  return (
    <section className="okp-forum-section">
      <OkpHeader title={data.name} subtitle={data.description}>
        <OkpBreadcrumbs crumbs={data.breadcrumbs} />
      </OkpHeader>
      {!!data.sections.length && (
        <div className="okp-forum-sections">
          {data.sections.map((section) => {
            return (
              <OkpForumSectionCard
                key={`section-${section.id}`}
                data={section}
              />
            );
          })}
        </div>
      )}
      <section className="okp-forum-topics">
        {data.topics.length ? (data.topics.map((topic) => {
          return (
            <OkpTopicCard key={`topic-${topic.id}`} data={topic} />
          )
        })) : (
          <div className="okp-forum-topics-empty">
            <span>{t("Thissectionisempty")}</span>
          </div>
        )}
      </section>
    </section>
  );
}
