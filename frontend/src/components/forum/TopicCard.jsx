import { Link } from "react-router-dom";
import { Clock, MessagesSquare } from "lucide-react";
import { qpabbr, qpdate, qpunit } from "@mcpronovost/qpfilters";
import { getTrans } from "@/_lib/i18n";

export default function ForumTopicCard({ data }) {
  const t = getTrans();

  return (
    <article className="okp-forum-topic">
      <div className="okp-forum-topic-card">
        <header className="okp-forum-topic-header">
          <div className="okp-forum-topic-header-banner">
            <figure className="okp-forum-topic-header-banner-cover">
              {data.author?.avatar && (
                <img
                  src={data.author.avatar}
                  alt={t("User's banner")}
                  className="okp-forum-topic-header-banner-cover-img"
                />
              )}
            </figure>
            <figure className="okp-forum-topic-header-banner-avatar">
              {(data.last_message && data.last_message?.author?.avatar) ||
              (!data.last_message && data.author?.avatar) ? (
                <img
                  src={data.last_message?.author?.avatar || data.author?.avatar}
                  alt={"User's avatar"}
                  className="okp-forum-topic-header-banner-avatar-img"
                />
              ) : (
                <div className="okp-forum-topic-header-banner-avatar-initial">
                  <span>{qpabbr(data.author?.name || t("Unknown"))}</span>
                </div>
              )}
            </figure>
          </div>
          <p className="okp-forum-topic-header-date">
            <span>Voros 3216</span>
          </p>
          <h3 className="okp-forum-topic-header-title">
            <Link to={`/g/${data.path}`}>{data.title}</Link>
          </h3>
        </header>
        <footer className="okp-forum-topic-footer">
          <div className="okp-forum-topic-footer-lastdate">
            <Clock size={12} />
            <span>
              {qpdate(data.last_message?.created_at || data.created_at)}
            </span>
          </div>
          <div className="okp-forum-topic-footer-replies">
            <span>
              {qpunit(data.total_messages)} {data.total_messages > 1 ? t("replies") : t("reply")}
            </span>
            <MessagesSquare size={12} />
          </div>
        </footer>
      </div>
    </article>
  );
}
