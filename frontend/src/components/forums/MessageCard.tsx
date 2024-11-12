import type { TopicMessage } from "@/types/forums.types";
import React from "react";
import { Shell } from "lucide-react";

interface Props {
  message: TopicMessage;
}

export default function MessageCard ({ message }: Props) {
  return (
    <article key={message.id} id={`okp-message-${message.id}`} className="okp-messages-card">
      <header className="okp-messages-card-header">
        <section className="okp-messages-card-header-author">
          <figure className="okp-messages-card-header-author-banner">
            {(message.character?.avatar) && (
              <img src={message.character.avatar} alt="" className="okp-messages-card-header-author-banner-img" />
            )}
          </figure>
          <figure className="okp-messages-card-header-author-avatar">
            {(message.character?.avatar) ? (
              <img src={message.character.avatar} alt="" className="okp-messages-card-header-author-avatar-img" aria-hidden="true" />
            ) : (message.character?.name) ? (
              <span className="okp-messages-card-header-author-avatar-abbr" aria-hidden="true">
                {message.character?.abbr}
              </span>
            ) : (
              <span className="okp-messages-card-header-author-avatar-icon" aria-hidden="true">
                <Shell size={24} />
              </span>
            )}
          </figure>
          <div className="okp-messages-card-header-author-loggedin">
            <span>Logged in</span>
          </div>
        </section>
      </header>
      <div className="okp-messages-card-content">
        {message.content}
      </div>
      <footer className="okp-messages-card-footer"></footer>
    </article>
  );
}
