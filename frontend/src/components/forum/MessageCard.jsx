import { Link } from "react-router-dom";
import { qpabbr, qpcode } from "@mcpronovost/qpfilters";
import { getTrans } from "@/_lib/i18n";

export default function ForumMessageCard({ data, first }) {
  const t = getTrans();

  return (
    <article className={`okp-forum-message ${!!first ? "okp-first" : ""}`}>
      <header className="okp-forum-message-header">
        <div className="okp-forum-message-header-banner">
          <figure className="okp-forum-message-header-banner-cover">
            {data.author?.avatar && (
              <img
                src={data.author.avatar}
                alt={t("User's banner")}
                className="okp-forum-message-header-banner-cover-img"
              />
            )}
          </figure>
          <figure className="okp-forum-message-header-banner-avatar">
            {data.author?.avatar ? (
              <img
                src={data.author?.avatar}
                alt={"User's avatar"}
                className="okp-forum-message-header-banner-avatar-img"
              />
            ) : (
              <div className="okp-forum-message-header-banner-avatar-initial">
                <span>{qpabbr(data.author?.name || t("Unknown"))}</span>
              </div>
            )}
          </figure>
        </div>
        <h3 className="okp-forum-message-header-name">
          {data.author ? (
            <Link to={`${t("/community")}/u/${data.author.id}`}>
              {data.author?.name}
            </Link>
          ) : (
            <span>{t("Unknown")}</span>
          )}
        </h3>
      </header>
      {!!data.content ? (
        <div
          className="okp-forum-message-content"
          dangerouslySetInnerHTML={{ __html: qpcode(data.content) }}
        ></div>
      ) : (
        <div className="okp-forum-message-deleted">
          <p>{t("Thismessagehasbeendeleted")}</p>
        </div>
      )}
    </article>
  );
}
