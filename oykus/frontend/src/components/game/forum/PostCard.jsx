import "@/assets/styles/forum/postCard.scss";
import { useI18n } from "@/services/i18n";
import { OkpAvatar, OkpBanner, OkpLink } from "@/components/ui";

export default function OkpGameForumPostCard({ post, isLast }) {
  const { t, d } = useI18n();

  return (
    <article key={post.id} className={`okp-forum-post-card ${isLast ? "okp-last" : ""}`} id={`post-${post.id}`}>
      <header className="okp-forum-post-card-header">
        <div className="okp-forum-post-card-header-character">
          {post.author?.character && (
            <>
              <OkpBanner
                src={post.author?.character?.avatar}
                className="okp-forum-post-card-header-character-banner"
                size={"inherit"}
              />
              <OkpAvatar
                src={post.author?.character?.avatar}
                fallback={post.author?.character?.abbr}
                className="okp-forum-post-card-header-character-avatar"
                size={"inherit"}
              />
            </>
          )}
          <p className="okp-forum-post-card-header-character-name">
            <span className="sr-only">{t("Post from")} </span>
            <strong>
              {post.author?.character?.name ? (
                <OkpLink href="#">{post.author?.character?.name}</OkpLink>
              ) : (
                t("Unknown")
              )}
            </strong>
          </p>
        </div>
        <div className="okp-forum-post-card-header-author">
          <strong>
            {t("by")} {post.author?.user?.name ? <OkpLink href="#">{post.author?.user?.name}</OkpLink> : t("Unknown")}
          </strong>
          <span>
            ,{" "}
            <time dateTime={post.created_at}>
              {d(post.created_at)}
            </time>
          </span>
        </div>
      </header>
      <section aria-labelledby="post-1" className="okp-forum-post-card-content">
        <div className="okp-forum-post-card-content-message">
          <div dangerouslySetInnerHTML={{ __html: post.message }} />
        </div>
      </section>
      <footer className="okp-forum-post-card-footer"></footer>
    </article>
  );
}
