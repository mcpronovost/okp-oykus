import "@/assets/styles/forum/topicCard.scss";
import { ChevronLast, Clock, MessagesSquare } from "lucide-react";
import { useI18n } from "@/services/i18n";
import { OkpAvatar, OkpBanner } from "@/components/ui";

export default function OkpGameForumTopicCard({ topic, total, index }) {
  const { t, d } = useI18n();

  if (!topic) return null;

  const flexModulo = total % 4;
  const flex =
    flexModulo > 0 && index < flexModulo
      ? `okp-flex-${Math.floor(100 / flexModulo)}`
      : "";

  return (
    <article className={`okp-forum-topic-card ${flex}`}>
      <div className="okp-forum-topic-card-box">
        <header className="okp-forum-topic-card-header">
          <OkpBanner
            src={topic.author?.character?.avatar}
            fallback={topic.author?.character?.name}
            size={80}
            className="okp-forum-topic-card-header-banner"
          />
          <OkpAvatar
            src={
              topic.last_post?.author?.character?.avatar ||
              topic.author?.character?.avatar
            }
            fallback={
              topic.last_post?.author?.character?.name ||
              topic.author?.character?.name
            }
            size={120}
            className="okp-forum-topic-card-header-avatar"
          />
          <h3 className="okp-forum-topic-card-header-title">
            <a href={topic.url} className="okp-forum-topic-card-header-title-link">{topic.title}</a>
          </h3>
          <p className="okp-forum-topic-card-header-lastpost">
            <a href={`${topic.url}?page=last`} className="okp-forum-topic-card-header-lastpost-link" aria-label={t("Go to the last post")} title={t("Go to the last post")}>
              <ChevronLast size={16} className="okp-forum-topic-card-header-lastpost-icon" />
            </a>
          </p>
        </header>
        <footer className="okp-forum-topic-card-footer">
          <div className="okp-forum-topic-card-footer-info">
            <div className="okp-forum-topic-card-footer-info-date">
              <Clock size={16} className="okp-forum-topic-card-footer-info-icon" />
              <span className="okp-forum-topic-card-footer-info-text">
                {d(topic.last_post?.created_at)}
              </span>
            </div>
            <div className="okp-forum-topic-card-footer-info-count">
              <span className="okp-forum-topic-card-footer-info-text">
                {topic.total_posts} {t("messages", topic.total_posts)}
              </span>
              <MessagesSquare size={16} className="okp-forum-topic-card-footer-info-icon" />
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
