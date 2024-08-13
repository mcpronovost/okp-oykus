import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { qpabbr, qpunit } from "@mcpronovost/qpfilters";
import { getTrans } from "@/_lib/i18n";

export default function ForumSectionCard({ data }) {
  const t = getTrans();

  return (
    <article className="okp-forum-section">
      <div className="okp-forum-section-card">
        <header className="okp-forum-section-header">
          {(!!data.cover || !!data.last_post) && (
            <div className="okp-forum-section-header-banner">
              {!!data.cover && (
                <figure className="okp-forum-section-header-banner-cover">
                  <img 
                    src={data.cover}
                    alt={t("Section's banner")}
                    className="okp-forum-section-header-banner-cover-img"
                  />
                </figure>
              )}
              {!!data.last_post && (
                <figure className="okp-forum-section-header-banner-last">
                  {(data.last_post.author?.avatar) ? (
                    <img
                      src={data.last_post.author.avatar}
                      alt={"User's avatar"}
                      className="okp-forum-section-header-banner-last-img"
                    />
                  ) : (
                    <div className="okp-forum-section-header-banner-last-initial">
                      <span>
                        {!!data.last_post.author?.name ? (
                          qpabbr(data.last_post.author.name)
                        ) : (
                          <User size={24} />
                        )}
                      </span>
                    </div>
                  )}
                </figure>
              )}
            </div>
          )}
          <h3 className="okp-forum-section-header-title" style={!!data.title_color ? { color: `var(--c-oahu)` } : null}>
            <Link to={`/g/${data.path}`}>{data.name}</Link>
          </h3>
          <p>{data.description}</p>
        </header>
        <section className="okp-forum-section-counts">
          <ul>
            <li>
              <span>{qpunit(data.total_messages)}</span> <span>{data.total_messages > 1 ? t("messages") : t("message")}</span>
            </li>
            <li>
              <span>{qpunit(data.total_topics)}</span> <span>{data.total_topics > 1 ? t("topics") : t("topic")}</span>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
