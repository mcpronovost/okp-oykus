import { theme } from "antd";
import { ChevronLast, Clock, Lock, MessagesSquare, Pin } from "lucide-react";
import { useTranslation } from "@/services/translation";
import { OkpAvatar, OkpBanner, OkpCard, OkpLink } from "@/components/ui";

const { useToken } = theme;

export default function OkpGameForumTopicCard({ topic, total, index }) {
  const { t, d } = useTranslation();
  const { token } = useToken();
  if (!topic) return null;

  const flexModulo = total % 4;
  const flex =
    flexModulo > 0 && index < flexModulo
      ? `okp-flex-${Math.floor(100 / flexModulo)}`
      : "";

  return (
    <article className={`okp-forum-topic-card ${flex}`}>
      <OkpCard
        className={`okp-forum-topic-card-box ${
          topic.is_important ? "okp-flag-important" : ""
        }`}
      >
        <header className="okp-forum-topic-card-header">
          <OkpBanner
            src={topic.author?.character?.avatar}
            alt={topic.author?.character?.abbr}
            size={80}
            className="okp-forum-topic-card-header-banner"
          />
          <OkpAvatar
            src={
              topic.last_post?.author?.character?.avatar ||
              topic.author?.character?.avatar
            }
            fallback={
              topic.last_post?.author?.character?.abbr ||
              topic.author?.character?.abbr
            }
            size={120}
            top={-16}
            className="okp-forum-topic-card-header-avatar"
          />
          <h3 className="okp-forum-topic-card-header-title">
            <OkpLink
              href={topic.url}
              title={topic.title}
              aria-label={topic.title}
              colour={token.colorPrimary}
              className="okp-forum-topic-card-header-title-link"
            >
              {topic.title}
            </OkpLink>
          </h3>
          <div className="okp-forum-topic-card-header-lastpost" style={{ backgroundColor: token.colorFill, borderColor: token.colorBgContainer, text: token.colorTextTertiary }}>
            <OkpLink
              href={`${topic.url}?page=last`}
              title={t("Go to the last post")}
              aria-label={t("Go to the last post")}
              className="okp-forum-topic-card-header-lastpost-link"
            >
              <ChevronLast
                size={16}
                className="okp-forum-topic-card-header-lastpost-icon"
              />
            </OkpLink>
          </div>
          <div className="okp-forum-topic-card-header-flags">
            {topic.is_pinned && (
              <span className="okp-forum-topic-card-header-flags-item">
                <Pin
                  size={12}
                  className="okp-forum-topic-card-header-flags-item-icon"
                />
                <span className="sr-only">{t("Topic is pinned")}</span>
              </span>
            )}
            {topic.is_locked && (
              <span className="okp-forum-topic-card-header-flags-item">
                <Lock
                  size={12}
                  className="okp-forum-topic-card-header-flags-item-icon"
                />
                <span className="sr-only">{t("Topic is locked")}</span>
              </span>
            )}
          </div>
        </header>
        <footer className="okp-forum-topic-card-footer">
          <div className="okp-forum-topic-card-footer-info">
            <div className="okp-forum-topic-card-footer-info-date">
              <Clock
                size={16}
                className="okp-forum-topic-card-footer-info-icon"
              />
              <span className="okp-forum-topic-card-footer-info-text">
                {d(topic.last_post?.created_at)}
              </span>
            </div>
            <div className="okp-forum-topic-card-footer-info-count">
              <span className="okp-forum-topic-card-footer-info-text">
                {topic.total_posts}{" "}
                <span className="sr-only">
                  {t("messages", topic.total_posts)}
                </span>
              </span>
              <MessagesSquare
                size={16}
                className="okp-forum-topic-card-footer-info-icon"
              />
            </div>
          </div>
        </footer>
      </OkpCard>
    </article>
  );
}
