import "@/assets/styles/forum/topic.scss";
import { useEffect } from "react";
import { OkpGameLayout, OkpGameForumPostList } from "@/components/game";
import { OkpHeading } from "@/components/common";
import { OkpBreadcrumb, OkpCard } from "@/components/ui";
import OkpGameForumFormNewPost from "@/components/game/forum/forms/NewPost";

export default function OkpForumTopic({ data }) {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    if (page === "last") {
      const lastPost = document.querySelector(".okp-last");
      const viewportElement = document.querySelector(
        "#okp-scrollarea .okp-scrollarea-viewport"
      );

      if (lastPost && viewportElement) {
        const lastPostRect = lastPost.getBoundingClientRect();
        const viewportRect = viewportElement.getBoundingClientRect();
        const scrollTop =
          lastPostRect.top - viewportRect.top + viewportElement.scrollTop;

        viewportElement.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        {data?.topic && (
          <section className="okp-forum-topic">
            <OkpHeading title={data.topic.title} tag="h1" />
            <OkpBreadcrumb breadcrumb={data.topic.breadcrumb} />

            {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

            <OkpGameForumPostList posts={data.topic.posts.results} />

            {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

            {/* Permissions Section */}
            <section className="okp-forum-topic-permissions">
              {data.topic.is_locked ? (
                <p>This topic is locked and cannot be replied to.</p>
              ) : (
                <p>You can reply to this topic.</p>
              )}
            </section>

            {/* Reply Form Section */}
            {!data.topic.is_locked && data.topic.posts.results?.length > 0 && (
              <section className="okp-forum-topic-reply">
                <OkpHeading
                  title="Reply"
                  description="You can reply to this topic."
                />
                <OkpCard>
                  <OkpGameForumFormNewPost topicId={data.topic.id} afterSubmit={() => {
                    window.location.href = `${window.location.pathname}?page=last`;
                  }} />
                </OkpCard>
              </section>
            )}

            {/* Footer Section */}
            <footer>
              <p>This is a footer.</p>
            </footer>
          </section>
        )}
      </section>
    </OkpGameLayout>
  );
}
