import React from "react";
import { CircleArrowOutDownRight, Clock, MessagesSquare } from "lucide-react";
import { qpdate, qpunit } from "@mcpronovost/qpfilters";
import imgAvatar from "@/assets/img/mc.jpg";

export default function TopicCard ({ topic }) {
  return (
    <article className={`okp-topics-card okp-animate-boxup`}>
      <section className="okp-topics-card-authors">
        <figure className="okp-topics-card-authors-banner">
          {true ? (
            <img src={imgAvatar.src} alt="" className="okp-topics-card-authors-banner-img" />
          ) : (
            <span className="okp-topics-card-authors-banner-abbr">MC</span>
          )}
        </figure>
        <figure className="okp-topics-card-authors-avatar">
          <a href={`${topic.path}`} className="okp-topics-card-authors-linklastmessage">
            <CircleArrowOutDownRight size={32} alt="Aller au dernier message" className="okp-topics-card-authors-golastmessage" />
            {true ? (
              <img src={imgAvatar.src} alt="" className="okp-topics-card-authors-avatar-img" aria-hidden="true" />
            ) : (
              <span className="okp-topics-card-authors-avatar-abbr" aria-hidden="true">MC</span>
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