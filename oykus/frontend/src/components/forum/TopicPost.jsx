import { OkpAvatar } from "@/components/ui";

export default function OkpTopicPost({ post }) {
  return (
    <article key={post.id} className="okp-topic-post" id={`post-${post.id}`}>
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
              {post.character?.name ? (
                <a href="#">{post.character.name}</a>
              ) : (
                "Unknown"
              )}
            </strong>
          </p>
        </div>
        <div className="okp-topic-post-header-author">
          <span className="sr-only"> written </span>
          <strong>
            by {post.user?.name ? <a href="#">{post.user.name}</a> : "Unknown"}
          </strong>
          <span>
            ,{" "}
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toDateString()}
            </time>
          </span>
        </div>
      </header>
      <section aria-labelledby="post-1" className="okp-topic-post-content">
        <div className="okp-topic-post-content-message">
          <div dangerouslySetInnerHTML={{ __html: post.message }} />
        </div>
      </section>
      <footer className="okp-topic-post-footer"></footer>
    </article>
  );
}
