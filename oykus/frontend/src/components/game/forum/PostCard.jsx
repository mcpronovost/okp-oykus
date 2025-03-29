import { useState } from "react";
import { X, Pencil } from "lucide-react";
import { Popconfirm, Tooltip, theme, notification } from "antd";
import { okpApi } from "@/services/api";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import { okpCode } from "@/utils";
import { OkpAvatar, OkpBanner, OkpButton, OkpCard, OkpEmpty, OkpLink } from "@/components/ui";
import OkpForumEditPost from "./forms/EditPost";

const { useToken } = theme;

export default function OkpGameForumPostCard({ post, isLast }) {
  const [api, contextHolder] = notification.useNotification();
  const { token } = useToken();
  const { user } = useAuth();
  const { t, d } = useTranslation();
  const [message, setMessage] = useState(post.message);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeletePost = async () => {
    setIsSubmitting(true);

    try {
      const result = await okpApi.deletePost(post.id);
      if (result?.success) {
        setIsDeleted(true);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      openNotification(t("Failed to delete post"), error, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPost = () => {
    setIsEditing(!isEditing);
  };

  const handleEditPostSubmit = (msg) => {
    setMessage(msg);
    setIsEditing(false);
    openNotification(t("Post updated"), t("Post updated successfully"), "success");
  };

  const openNotification = (title, msg, type = "error") => {
    api.open({
      type,
      message: title,
      description: msg?.message || String(msg),
    });
  };

  if (isDeleted) {
    return (
      <OkpCard key={post.id} className={`okp-forum-post-card ${isLast ? "okp-last" : ""}`} id={`post-${post.id}`}>
        <OkpEmpty text={t("Post deleted")} />
      </OkpCard>
    );
  }

  return (
    <OkpCard key={post.id} className={`okp-forum-post-card ${isLast ? "okp-last" : ""}`} id={`post-${post.id}`}>
      {contextHolder}
      <header className="okp-forum-post-card-header">
        <div className="okp-forum-post-card-header-character">
          {post.author?.character && (
            <>
              <OkpBanner
                src={post.author?.character?.avatar}
                size={"inherit"}
                opacity={0.2}
                className="okp-forum-post-card-header-character-banner"
              />
              <OkpAvatar
                src={post.author?.character?.avatar}
                fallback={post.author?.character?.abbr}
                size={"inherit"}
                top={-12}
                className="okp-forum-post-card-header-character-avatar"
              />
            </>
          )}
          <p className="okp-forum-post-card-header-character-name">
            <span className="sr-only">{t("Post from")} </span>
            <strong>
              {post.author?.character?.name ? (
                <OkpLink href="#">{post.author?.character?.name}</OkpLink>
              ) : (
                t("an unknown")
              )}
            </strong>
          </p>
        </div>
        <div className="okp-forum-post-card-header-author" style={{ color: token.colorTextSecondary }}>
          <strong>
            {post.author?.user?.name ? <OkpLink href="#">{`${t("by")} ${post.author?.user?.name}`}</OkpLink> : t("by an unknown")}
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
          {isEditing ? (
            <OkpForumEditPost post={post} afterSubmit={handleEditPostSubmit} onCancel={() => setIsEditing(false)} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: okpCode(message) }} />
          )}
        </div>
      </section>
      <footer className="okp-forum-post-card-footer">
        <div className="okp-forum-post-card-footer-actions">
          {(post.author?.user?.id === user?.id) && (
            <>
              <Tooltip title={t("Edit post")} placement="bottom">
                <OkpButton type="dashed" size="small" onClick={handleEditPost} disabled={isSubmitting}>
                  <Pencil size={12} />
                </OkpButton>
              </Tooltip>
              <Popconfirm
                title={t("Delete post")}
                description={t("Are you sure you want to delete this post?")}
                onConfirm={handleDeletePost}
                okText={t("Yes")}
                cancelText={t("No")}
              >
                <Tooltip title={t("Delete post")} placement="bottom">
                  <OkpButton type="dashed" size="small" disabled={isSubmitting}>
                    <X size={12} />
                  </OkpButton>
                </Tooltip>
              </Popconfirm>
            </>
          )}
        </div>
      </footer>
    </OkpCard>
  );
}
