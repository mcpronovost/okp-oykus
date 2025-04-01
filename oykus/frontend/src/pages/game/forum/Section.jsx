import { useState } from "react";
import { useTranslation } from "@/services/translation";
import { OkpGameLayout } from "@/components/layout";
import { OkpGameForumTopicList } from "@/components/game";
import { OkpBreadcrumb, OkpButton, OkpCard, OkpHeading } from "@/components/ui";
import OkpGameForumFormNewTopic from "@/components/game/forum/forms/NewTopic";

function OkpBreadcrumbActions({ items, showAction, action }) {
  const { t } = useTranslation();

  return (
    <div className="okp-forum-breadtions">
      <div className="okp-forum-breadtions-breadcrumb">
        <OkpBreadcrumb items={items} />
      </div>
      {!showAction && (
        <div className="okp-forum-breadtions-actions">
          <OkpButton onClick={action}>{t("New Topic")}</OkpButton>
        </div>
      )}
    </div>
  );
}

export default function OkpGameForumSection({ data }) {
  const { t } = useTranslation();
  const [showNewTopic, setShowNewTopic] = useState(false);

  const handleNewTopic = () => {
    setShowNewTopic(true);
  }

  const handleCancelNewTopic = () => {
    setShowNewTopic(false);
  }

  return (
    <OkpGameLayout data={data}>
      {data?.section && (
        <section className="okp-forum-section">
          <OkpHeading title={data.section.title} />
          <OkpBreadcrumbActions items={data.section.breadcrumb} showAction={!!showNewTopic} action={handleNewTopic} />
          {showNewTopic ? (
            <section id="reply" className="okp-forum-topic-reply">
              <OkpHeading
                title={t("New Topic")}
                description={t("Create a new topic.")}
              />
              <OkpCard>
                <OkpGameForumFormNewTopic gameId={data.id} sectionId={data.section.id} onCancel={handleCancelNewTopic} />
              </OkpCard>
            </section>
          ) : (
            <OkpGameForumTopicList topics={data.section.topics} />
          )}
          <OkpBreadcrumbActions items={data.section.breadcrumb} action={handleNewTopic} />
        </section>
      )}
    </OkpGameLayout>
  );
}
