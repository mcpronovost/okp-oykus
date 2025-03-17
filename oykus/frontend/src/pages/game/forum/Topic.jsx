import { OkpGameLayout, OkpGameForumPostList } from "@/components/game";
import { OkpHeading } from "@/components/common";
import { OkpBreadcrumb } from "@/components/ui";

export default function OkpForumTopic({ data }) {
  return (
    <OkpGameLayout data={data}>
      <section className="okp-forum">
        {data?.topic && (
          <section className="okp-forum-topic">
            <OkpHeading title={data.topic.title} />
            <OkpBreadcrumb breadcrumb={data.topic.breadcrumb} />

            {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

            <OkpGameForumPostList posts={data.topic.posts} />

            {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

            {/* Permissions Section */}
            <section
              className="okp-permissions"
              aria-labelledby="permissions-heading"
            >
              <h2 id="permissions-heading" className="sr-only">
                Permissions
              </h2>
              <p>You can reply to this topic.</p>
              <p>Editing is allowed for 15 minutes after posting.</p>
            </section>

            <footer>
              <p>
                <a href="#">Back to Forum</a>
              </p>
            </footer>
          </section>
        )}
      </section>
    </OkpGameLayout>
  );
}
