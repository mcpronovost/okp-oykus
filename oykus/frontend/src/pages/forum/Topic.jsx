import "@/assets/styles/forum/topic.scss";
import { useEffect, useState, useRef } from "react";
import { OkpForm, OkpSelect, OkpField, OkpActions, OkpSubmit, OkpReset } from "@/components/form";
import { useForumApi } from "@/services/api";
import { useI18n } from "@/services/i18n";
import { OkpError, OkpHeading } from "@/components/common";
import { OkpAvatar, OkpLoading } from "@/components/ui";

export default function OkpTopic() {
  const { getTopic, createPost } = useForumApi();
  const { t } = useI18n();

  const isInit = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    async function getPosts() {
      try {
        const result = await getTopic(1);
        setTopic(result);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isLoading || isInit.current) {
      setIsLoading(true);
      getPosts();
      isInit.current = false;
    }
  }, []);

  const handleReply = async (e) => {
    console.log("handleReply");
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("topic", topic.id);

    const postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
    
    // Log the form data entries object
    console.log(postData);

    try {
      const result = await createPost(postData);
      console.log(result);
    } catch (error) {
      // console.error(error);
    }
  };

  if (isLoading) {
    return <OkpLoading />;
  }

  if (!topic) {
    return <OkpError />;
  }

  return (
    <section className="okp-topic">
      <OkpHeading title={topic.title} />

      {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

      {/* Posts Section */}
      <section className="okp-topic-posts">
        {topic.posts?.length > 0 && topic.posts.map((post) => (
          <article
            key={post.id}
            className="okp-topic-post"
            id={`post-${post.id}`}
          >
            <header className="okp-topic-post-header">
              <div className="okp-topic-post-header-character">
                {post.character && (
                  <OkpAvatar
                    src={post.character?.avatar}
                    fallback={post.character?.abbr}
                    className="okp-topic-post-header-character-avatar"
                    size={"inherit"}
                  />
                )}
                <p className="okp-topic-post-header-character-name">
                  <span className="sr-only">Post from </span>
                  <strong>
                    {post.character?.name ? <a href="#">{post.character.name}</a> : "Unknown"}
                  </strong>
                </p>
              </div>
              <div className="okp-topic-post-header-author">
                <span className="sr-only"> written </span>
                <strong>
                  by {post.user?.name ? <a href="#">{post.user.name}</a> : "Unknown"}
                </strong>
                <span>
                  , <time dateTime={post.created_at}>{new Date(post.created_at).toDateString()}</time>
                </span>
              </div>
            </header>
            <section
              aria-labelledby="post-1"
              className="okp-topic-post-content"
            >
              <div className="okp-topic-post-content-message">
                <div dangerouslySetInnerHTML={{ __html: post.message }} />
              </div>
            </section>
            <footer className="okp-topic-post-footer"></footer>
          </article>
        ))}
      </section>

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

      {/* Reply Form Section */}
      {topic.posts?.length > 0 && (
        <section className="okp-topic-reply" aria-labelledby="reply-heading">
          <OkpHeading title={t("Reply")} description="You can reply to this topic." tag="h2" />
          <OkpForm onSubmit={handleReply} className="okp-topic-reply-card">
            <OkpField name="character" label="Character" errors={[{
              message: "Please select a character",
              match: "valueMissing",
            }]}>
              <OkpSelect name="character" placeholder="Select a character" items={[{
                value: "1",
                label: "Pachua",
              }, {
                value: "2",
                label: "Sedem",
              }]} required />
            </OkpField>
            <OkpField name="message" label="Message" errors={[{
              message: "Please enter a message",
              match: "valueMissing",
            }, {
              message: "Message must be at least 10 characters long",
              match: "tooShort",
            }]}>
              <textarea className="okp-form-textarea" required minLength={1} rows={8} />
            </OkpField>
            <OkpActions>
              <OkpSubmit label="Envoyer" />
              <OkpReset label="Réinitialiser" />
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
