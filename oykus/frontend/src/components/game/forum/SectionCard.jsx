import { Card, theme } from "antd";
import { ChevronLast } from "lucide-react";
import { useTranslation } from "@/services/translation";
import { OkpAvatar, OkpLink } from "@/components/ui";

const { useToken } = theme;

export default function OkpGameForumSectionCard({ section, tag = "section" }) {
  if (!section) return null;

  const { token } = useToken();
  const { t, d } = useTranslation();

  const OkpSectionTag = tag;

  return (
    <OkpSectionTag
      className={`okp-forum-section-card okp-flex-${section.flex || 50}`}
      key={section.id}
    >
      <Card
        className="okp-forum-section-card-box"
        style={{
          justifyContent: section.is_show_last_post
            ? "space-between"
            : "center",
        }}
      >
        {section.cover && (
          <figure
            className="okp-forum-section-card-banner"
            style={{ borderRadius: token.borderRadiusLG }}
          >
            <img
              src={section.cover}
              alt={section.title}
              loading="lazy"
              className="okp-forum-section-card-banner-cover"
            />
          </figure>
        )}
        <header className="okp-forum-section-card-header">
          <h3 className="okp-forum-section-card-header-title" style={{ textShadow: `0 0 3px ${token.colorBgContainer}` }}>
            <OkpLink
              href={section.url}
              colour={section.colour}
              className="okp-forum-section-card-header-title-link"
            >
              {section.title}
            </OkpLink>
          </h3>
        </header>
        {section.is_show_last_post && section.last_post && (
          <div className="okp-forum-section-card-lastpost">
            <OkpAvatar
              src={section.last_post.author?.character?.avatar}
              fallback={section.last_post.author?.character?.abbr || "?"}
              size={80}
              stroke={4}
            />
            <div
              className="okp-forum-section-card-lastpost-goto"
              style={{ backgroundColor: token.colorFill, border: `3px solid ${token.colorBgContainer}`, color: token.colorTextTertiary }}
            >
              <OkpLink
                href={`${section.last_post.topic.url}?page=last`}
                className="okp-forum-section-card-lastpost-goto-link"
                aria-label={t("Go to the last post")}
                title={t("Go to the last post")}
              >
                <ChevronLast
                  size={16}
                  className="okp-forum-section-card-lastpost-icon"
                />
              </OkpLink>
            </div>
          </div>
        )}
        {section.is_show_last_post && section.last_post && (
          <footer className="okp-forum-section-card-footer">
            <div className="okp-forum-section-card-footer-lastpost" style={{ textShadow: `0 0 3px ${token.colorBgContainer}` }}>
              <OkpLink
                href={section.last_post.topic.url}
                className="okp-forum-section-card-footer-lastpost-link"
              >
                {section.last_post.topic.title}
              </OkpLink>
              <span className="okp-forum-section-card-footer-lastpost-date">
                {t("written on")} {d(section.last_post?.created_at)}
              </span>
            </div>
          </footer>
        )}
      </Card>
    </OkpSectionTag>
  );
}
