import React from "react";
import { CircleArrowOutDownRight, Clock, MessagesSquare, Shell } from "lucide-react";
import { qpdate, qpunit } from "@mcpronovost/qpfilters";
import imgAvatar from "@/assets/img/mc.jpg";

export default function TopicCard({ index, topic, total }) {
  const basis = (
    (total % 5 === 0) && (index === 0)
  ) ? "okp-basis-100" : (
    (total % 6 === 0) && (index === 0 || index === 1)
  ) ? "okp-basis-50" : (
    (total % 7 === 0) && (index === 0 || index === 1 || index === 2)
  ) ? "okp-basis-33" : "";
  return (
    <article className={`okp-topics-card okp-animate-boxup ${basis}`}>
      <section className="okp-topics-card-authors">
        <figure className="okp-topics-card-authors-banner">
          {(topic.character?.avatar) && (
            <img src={topic.character.avatar} alt="" className="okp-topics-card-authors-banner-img" />
          )}
        </figure>
        <figure className="okp-topics-card-authors-avatar">
          <a href={`${topic.path}`} className="okp-topics-card-authors-linklastmessage">
            <CircleArrowOutDownRight size={32} alt="Aller au dernier message" className="okp-topics-card-authors-golastmessage" />
            {(topic.last_message.character?.avatar) ? (
              <img src={topic.last_message.character.avatar} alt="" className="okp-topics-card-authors-avatar-img" aria-hidden="true" />
            ) : (topic.last_message.character?.name) ? (
              <span className="okp-topics-card-authors-avatar-abbr" aria-hidden="true">
                {topic.last_message.character?.abbr}
              </span>
            ) : (
              <span className="okp-topics-card-authors-avatar-icon" aria-hidden="true">
                <Shell />
              </span>
            )}
          </a>
        </figure>
      </section>
      <header className="okp-topics-card-header">
        <div className="okp-topics-card-header-date">
          <span>31 octobre 2024</span>
        </div>
        <h3 className="okp-topics-card-header-title">
          <a href={`${topic.path}`}>{topic.name.length > 64 ? `${topic.name.substring(0, 64)}...` : topic.name}</a>
        </h3>
      </header>
      <footer className="okp-topics-card-footer">
        <time className="okp-topics-card-footer-date">
          <span className="okp-icon"><Clock size={12} /></span>
          <span className="okp-text">{
            qpdate(topic.last_message?.created_at || topic.created_at)
          }</span>
        </time>
        <div className="okp-topics-card-footer-total">
          <span className="okp-text">{qpunit(topic.total_messages)}</span>
          <span className="okp-icon"><MessagesSquare size={12} /></span>
        </div>
      </footer>
    </article>
  );
}