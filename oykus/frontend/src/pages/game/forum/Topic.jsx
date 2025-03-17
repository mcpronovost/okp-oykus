import { useEffect } from "react";
import { OkpGameLayout, OkpGameForumPostList } from "@/components/game";
import { OkpHeading } from "@/components/common";
import { OkpBreadcrumb } from "@/components/ui";

export default function OkpForumTopic({ data }) {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    if (page === "last") {
      const lastPost = document.querySelector(".okp-last");
      const viewportElement = document.querySelector("#okp-scrollarea .okp-scrollarea-viewport");

      if (lastPost && viewportElement) {
        const lastPostRect = lastPost.getBoundingClientRect();
        const viewportRect = viewportElement.getBoundingClientRect();
        const scrollTop = lastPostRect.top - viewportRect.top + viewportElement.scrollTop;

        viewportElement.scrollTo({
          top: scrollTop,
          behavior: "smooth"
        });
      }
    }
  }, []);

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

            {/* Footer Section */}
            <footer>
              <p>
                This is a footer.
              </p>
            </footer>
          </section>
        )}
      </section>
    </OkpGameLayout>
  );
}
