import type { CategorySection } from "@/types/forums.types";
import React from "react";
import { useStore } from "@nanostores/react";
import { CircleArrowOutDownRight, Shell } from "lucide-react";
import { qpdate } from "@mcpronovost/qpfilters";
import { lang } from "@/stores/storeWeb";
import { getTranslation } from "@/i18n/i18n";
import { useRouter } from "@/hooks/core/useRouter";

interface Props {
  section: CategorySection;
}

export default function OkpForumSectionCard ({ section }: Props) {
  const $lang = useStore(lang);
  const t = getTranslation($lang);
  const { doRoute } = useRouter();

  return (
    <article className={`okp-sections-card okp-basis-${section.basis}`}>
      <div className="okp-sections-card-wrapper okp-animate-boxup">
        {section.banner && (
          <section className="okp-sections-card-banner" style={{ height: `${section.banner_height}px` }}>
            <figure className="okp-sections-card-banner-figure">
              <img src={section.banner} alt="" className="okp-sections-card-banner-figure-img" aria-hidden="true" />
            </figure>
          </section>
        )}
        {(section.show_last_message && section.last_message) && (
          <section className={`okp-sections-card-lastmessage ${section.banner ? "okp-with-banner" : ""}`}>
            <figure className="okp-sections-card-lastmessage-avatar">
              <a href={`${section.last_message.path}?page=last`} onClick={doRoute} className="okp-sections-card-lastmessage-link" aria-label={t("Go to the last message")} title={t("Go to the last message")}>
                <CircleArrowOutDownRight size={32} className="okp-sections-card-lastmessage-golast" />
                {(section.last_message.character?.avatar) ? (
                  <img src={section.last_message.character.avatar} alt="" className="okp-sections-card-lastmessage-avatar-img" aria-hidden="true" />
                ) : (section.last_message.character?.name) ? (
                  <span className="okp-sections-card-lastmessage-avatar-abbr" aria-hidden="true">
                    {section.last_message.character?.abbr}
                  </span>
                ) : (
                  <span className="okp-sections-card-lastmessage-avatar-icon" aria-hidden="true">
                    <Shell size={24} />
                  </span>
                )}
              </a>
            </figure>
          </section>
        )}
        <header className="okp-sections-card-header">
          <h3 className="okp-sections-card-header-title">
            <a href={`${section.path}`} onClick={doRoute}>{section.name.length > 64 ? `${section.name.substring(0, 64)}...` : section.name}</a>
          </h3>
        </header>
        {(section.show_last_topic && section.last_topic) && (
          <footer className="okp-sections-card-footer">
            <div className="okp-sections-card-footer-lastmessage">
              <a href={`${section.last_topic.path}`} onClick={doRoute} aria-label={t("Go to the last topic")} title={t("Go to the last topic")}>
                {section.last_topic.name.length > 32 ? `${section.last_topic.name.substring(0, 32)}...` : section.last_topic.name}
              </a>
              <span>{qpdate(section.last_topic.created_at)}</span>
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}
