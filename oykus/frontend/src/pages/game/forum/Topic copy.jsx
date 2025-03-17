import "@/assets/styles/forum/topic.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { OkpForm, OkpSelect, OkpField, OkpActions, OkpSubmit, OkpReset } from "@/components/form";
import { useForumApi } from "@/services/api";
import { useI18n } from "@/services/i18n";
import { OkpError, OkpHeading } from "@/components/common";
import { OkpLoading } from "@/components/ui";
import { OkpGameForumPostCard } from "@/components/game";

export default function OkpTopic() {
  const { getTopic, createPost } = useForumApi();
  const { t } = useI18n();

  const [currentPage, setCurrentPage] = useState(() => {
    const url = new URL(window.location);
    return url.searchParams.get("page") || 1;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topic, setTopic] = useState(null);

  const fetchTopic = useCallback(async (page = currentPage) => {
    try {
      const result = await getTopic(1, page);
      setTopic(result);
      setCurrentPage(result.pagination.page);
      const url = new URL(window.location);
      url.searchParams.set("page", result.pagination.page);
      window.history.replaceState({}, "", url);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, getTopic]);

  const handleReply = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("topic", topic.id);

    const postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });

    try {
      const result = await createPost(postData);
      await fetchTopic("last");
      e.target.reset();
      
      setTimeout(() => {
        const newPost = document.getElementById(`post-${result.id}`);
        if (newPost) {
          newPost.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [topic?.id, createPost, fetchTopic]);

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  const posts = useMemo(() => {
    if (!topic?.posts) return null;

    return topic.posts.map((post) => (
      <OkpGameForumPostCard key={post.id} post={post} />
    ));
  }, [topic?.posts]);

  if (isLoading) {
    return <OkpLoading />;
  }

  if (!topic) {
    return <OkpError />;
  }

  return (
    <section className="okp-topic">

      {/* Posts Section */}
      <section className="okp-topic-posts">
        {topic.posts?.length > 0 && posts}
      </section>

      {/* Reply Form Section */}
      {topic.posts?.length > 0 && (
        <section className="okp-topic-reply" aria-labelledby="reply-heading">
          <OkpHeading title={t("Reply")} description="You can reply to this topic." tag="h2" />
          <OkpForm onSubmit={handleReply} className="okp-topic-reply-card">
            <OkpField name="character" label="Character">
              <OkpSelect placeholder="Select a character" items={[{
                value: "1",
                label: "Pachua",
              }, {
                value: "2",
                label: "Sedem",
              }]} disabled={isSubmitting} required />
            </OkpField>
            <OkpField name="message" label="Message">
              <textarea className="okp-form-textarea" rows={8} disabled={isSubmitting} required />
            </OkpField>
            <OkpActions>
              <OkpSubmit label={isSubmitting ? "Sending..." : "Send"} disabled={isSubmitting} />
              <OkpReset label="Reset" disabled={isSubmitting} />
            </OkpActions>
          </OkpForm>
        </section>
      )}

      <footer>
        <p>
          <a href="#">Back to Forum</a>
        </p>
      </footer>
    </section>
  );
}
