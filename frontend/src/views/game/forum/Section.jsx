import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";
import OkpHeader from "@/components/common/Header";
import OkpButton from "@/components/common/Button";
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
  const location = useLocation();
  const t = getTrans();
  const [toggleWriteTopic, setToggleWriteTopic] = useState(false);

  function handleWriteTopic () {
    setToggleWriteTopic(!toggleWriteTopic);
  };

  useEffect(() => {
    if (toggleWriteTopic) setToggleWriteTopic(false);
  }, [location]);

  return (
    <section className="okp-forum-section">
      <OkpHeader title={data.name} subtitle={data.description}>
        <OkpBreadcrumbs crumbs={data.breadcrumbs} />
      </OkpHeader>
      {!toggleWriteTopic && !!data.sections.length && (
        <>
          <section className="okp-forum-sections">
            {data.sections.map((section) => {
              return (
                <OkpForumSectionCard
                  key={`section-${section.id}`}
                  data={section}
                />
              );
            })}
          </section>
          <hr />
        </>
      )}
      {!toggleWriteTopic && (
        <section className="okp-forum-topics">
          <aside className="okp-forum-topics-aside">
            <section className="okp-forum-topics-aside-buttons">
              <OkpButton onClick={handleWriteTopic} block colour="primary" start={<Pencil size="1rem" />}>
                <span>{t("New Chapter")}</span>
              </OkpButton>
            </section>
            <section className="okp-forum-topics-aside-quests">quests</section>
            <section className="okp-forum-topics-aside-permissions">
              permissions
              <br />
              permissions
              <br />
              permissions
              <br />
              permissions
              <br />
            </section>
          </aside>
          <div className="okp-forum-topics-list">
            {data.topics.length ? (
              data.topics.map((topic) => {
                return <OkpTopicCard key={`topic-${topic.id}`} data={topic} />;
              })
            ) : (
              <div className="okp-forum-topics-empty">
                <span>{t("Thissectionisempty")}</span>
              </div>
            )}
          </div>
        </section>
      )}
      {toggleWriteTopic && (
        <section className="okp-forum-write-topic">
          <article className="okp-forum-write-topic-card">
            aaa
          </article>
          <footer className="okp-forum-write-topic-footer">
            <OkpButton onClick={handleWriteTopic}>
              <span>{t("Cancel")}</span>
            </OkpButton>
            <OkpButton colour="primary">
              <span>{t("Send")}</span>
            </OkpButton>
          </footer>
        </section>
      )}
    </section>
  );
}
