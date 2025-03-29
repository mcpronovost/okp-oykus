import { useEffect } from "react";
import { useTranslation } from "@/services/translation";
import { okpScrollTo } from "@/utils";
import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumPostList } from "@/components/game";
import { OkpBreadcrumb, OkpButton, OkpCard, OkpHeading  } from "@/components/ui";
import OkpGameForumFormNewPost from "@/components/game/forum/forms/NewPost";

function OkpBreadcrumbActions({ breadcrumb }) {
  const { t } = useTranslation();

  return (
    <div className="okp-forum-breadtions">
      <div className="okp-forum-breadtions-breadcrumb">
        <OkpBreadcrumb breadcrumb={breadcrumb} />
      </div>
      <div className="okp-forum-breadtions-actions">
        <OkpButton onClick={() => {
          const replySection = document.getElementById("reply");
          okpScrollTo(replySection);
        }}>{t("Reply")}</OkpButton>
      </div>
    </div>
  );
}

export default function OkpGameForumTopic({ data }) {
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    if (page === "last") {
      const lastPost = document.querySelector(".okp-last");
      okpScrollTo(lastPost);
    }
  }, []);

  return (
    <OkpGameLayout data={data}>
      {data?.topic && (
        <section className="okp-forum-topic">
          <OkpHeading title={data.topic.title} tag="h1" />
          <OkpBreadcrumbActions breadcrumb={data.topic.breadcrumb} />
          <OkpGameForumPostList posts={data.topic.posts.results} />
          <OkpBreadcrumbActions breadcrumb={data.topic.breadcrumb} />

          {/* Reply Form Section */}
          {!data.topic.is_locked && data.topic.posts.results?.length > 0 && (
            <section id="reply" className="okp-forum-topic-reply">
              <OkpHeading
                title={t("Reply")}
                description={t("You can reply to this topic.")}
              />
              <OkpCard>
                <OkpGameForumFormNewPost gameId={data.id} topicId={data.topic.id} afterSubmit={() => {
                  window.location.href = `${window.location.pathname}?page=last`;
                }} />
              </OkpCard>
            </section>
          )}
        </section>
      )}
    </OkpGameLayout>
  );
}
