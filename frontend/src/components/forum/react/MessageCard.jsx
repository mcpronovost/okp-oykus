import React from "react";

export default function MessageCard ({ message }) {
  return (
    <article key={message.id} className="okp-messages-card">
      <header className="okp-messages-card-header">
        (author)
      </header>
      <div className="okp-messages-card-content">
        {message.content}
      </div>
      <footer className="okp-messages-card-footer">
        (footer)
      </footer>
    </article>
  );
}
