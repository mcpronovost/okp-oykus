import "@/assets/styles/forum/topic.scss";
import { useEffect, useState } from "react";
import { OkpForm, OkpSelect, OkpField, OkpActions, OkpSubmit, OkpReset } from "@/components/form";
import { useApi } from "@/services/api";
import { useI18n } from "@/services/i18n";
import imgMC from "@/assets/img/mc.jpg";
import imgPachua from "@/assets/img/pachua.jpg";

export default function OkpTopic() {
  const { get } = useApi();
  const { t } = useI18n();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function getPosts() {
      try {
        const result = await get("/forum/topics/1/posts/");
        setTimeout(() => {
          if (mounted) {
            setPosts(result);
          }
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    getPosts();
  
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const message = formData.get("message");
    const authorName = formData.get("authorName");
    const authorAvatar = imgMC;
    const characterName = formData.get("characterName");
    const characterAvatar = imgPachua;
    const date = new Date().toISOString();

    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        author: {
          name: authorName,
          avatar: authorAvatar,
        },
        character: {
          name: characterName,
          avatar: characterAvatar,
        },
        date,
        message,
      },
    ]);
  };

  return (
    <section className="okp-topic">
      <header className="okp-topic-header">
        <h1 className="okp-topic-header-title">Topic Title</h1>
        <div className="okp-topic-header-description">
          <p>Topic Description</p>
        </div>
      </header>

      {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

      {/* Posts Section */}
      <section className="okp-topic-posts">
        {posts?.length > 0 && posts.map((post) => (
          <article
            key={post.id}
            className="okp-topic-post"
            id={`post-${post.id}`}
          >
            <header className="okp-topic-post-header">
              <div className="okp-topic-post-header-character">
                {post.character && (
                  <figure
                    aria-hidden="true"
                    className="okp-topic-post-header-character-avatar"
                  >
                    <img src={post.character?.avatar} alt={post.character?.name || "Character Avatar"} />
                  </figure>
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
      {!isLoading && posts?.length > 0 &&  (
        <section className="okp-topic-reply" aria-labelledby="reply-heading">
          <header className="okp-topic-reply-header">
            <h2 className="okp-topic-reply-header-title" id="reply-heading">
              {t("Reply")}
          </h2>
          <div className="okp-topic-reply-header-description">
            <p>
              Vous pouvez répondre à ce sujet.
            </p>
          </div>
        </header>
        <div className="okp-topic-reply-card">
          <OkpForm onSubmit={handleSubmit}>
            <OkpField name="character" label="Character" errors={[{
              message: "Please select a character",
              match: "valueMissing",
            }]}>
              <OkpSelect name="character" placeholder="Select a character" required />
            </OkpField>
            <OkpField name="message" label="Message" errors={[{
              message: "Please enter a message",
              match: "valueMissing",
            }, {
              message: "Message must be at least 10 characters long",
              match: "tooShort",
            }]}>
              <textarea className="okp-form-textarea" required minLength={10} rows={8} />
            </OkpField>
            <OkpActions>
              <OkpSubmit label="Envoyer" />
              <OkpReset label="Réinitialiser" />
            </OkpActions>
          </OkpForm>
          </div>
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
