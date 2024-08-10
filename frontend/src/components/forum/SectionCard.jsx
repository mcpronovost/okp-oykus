import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { qpabbr } from "@mcpronovost/qpfilters";
import { getTrans } from "@/_lib/i18n";

export default function ForumSectionCard({ data }) {
  const navigate = useNavigate();
  const t = getTrans();

  function handleCardClick() {
    navigate(`/g/${data.path}`);
  }

  return (
    <article className="okp-forum-section">
      <div onClick={handleCardClick} className="okp-forum-section-card">
        <header className="okp-forum-section-header">
          <div className="okp-forum-section-header-banner">
            {!!data.banner && (
              <figure className="okp-forum-section-header-banner-cover">
                <img 
                  src={data.banner}
                  alt={t("Section's banner")}
                  className="okp-forum-section-header-banner-cover-img"
                 />
              </figure>
            )}
            {!!data.last_message && (
              <figure className="okp-forum-section-header-banner-last">
                {(data.last_message.author?.avatar) ? (
                  <img
                    src={data.last_message.author.avatar}
                    alt={"User's avatar"}
                    className="okp-forum-section-header-banner-last-img"
                  />
                ) : (
                  <div className="okp-forum-section-header-banner-last-initial">
                    <span>
                      {!!data.last_message.author?.name ? (
                        qpabbr(data.last_message.author.name)
                      ) : (
                        <User size={24} />
                      )}
                    </span>
                  </div>
                )}
              </figure>
            )}
          </div>
          <h3 className="okp-forum-section-header-title">
            <Link to={`/g/${data.path}`}>{data.name}</Link>
          </h3>
          <p>{data.description}</p>
        </header>
      </div>
    </article>
  );
}
