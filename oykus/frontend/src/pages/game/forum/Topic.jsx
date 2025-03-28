import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumPostList } from "@/components/game";
import { OkpHeading, OkpBreadcrumb, OkpCard } from "@/components/ui";
import OkpGameForumFormNewPost from "@/components/game/forum/forms/NewPost";

export default function OkpGameForumCategory({ data }) {
  return (
    <OkpGameLayout data={data}>
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
        </section>
      )}
    </OkpGameLayout>
  );
}
