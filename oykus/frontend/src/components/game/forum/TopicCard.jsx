import "@/assets/styles/forum/topicCard.scss";
import { getDate } from "@/services/i18n/utils";
import { OkpAvatar, OkpBanner } from "@/components/ui";

export default function OkpGameForumTopicCard({ topic, total, index }) {
  if (!topic) return null;

  console.log(topic);

  const flexModulo = total % 4;
  const flex = flexModulo > 0 && index < flexModulo ? `okp-flex-${Math.floor(100 / flexModulo)}` : "";

  return (
    <article className={`okp-forum-topic-card ${flex}`}>
      <div className="okp-forum-topic-card-box">
        <header className="okp-forum-topic-card-header">
          <OkpBanner src={topic.author?.character?.avatar} fallback={topic.author?.character?.name} size={80} className="okp-forum-topic-card-header-banner" />
          <OkpAvatar src={topic.last_post?.author?.character?.avatar || topic.author?.character?.avatar} fallback={topic.last_post?.author?.character?.name || topic.author?.character?.name} size={120} className="okp-forum-topic-card-header-avatar" />
          <h3 className="okp-forum-topic-card-title">
            <a href={topic.url}>{topic.title}</a>
          </h3>
        </header>
        <footer className="okp-forum-topic-card-footer">
          <div className="okp-forum-topic-card-footer-info">
            <span className="okp-forum-topic-card-footer-info-date">
              {getDate(topic.last_post?.created_at)}
            </span>
            <span className="okp-forum-topic-card-footer-info-count">
              {topic.total_posts} messages
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
}
