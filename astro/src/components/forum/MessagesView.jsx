import React, { useEffect, useState } from "react";

export default function MessagesView ({ slug, topic}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [messages, setMessages] = useState([]);

  const doGetMessages = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setHasError(null);
      try {
        const params = new URLSearchParams(window.location.search);
        const currentPage = params.get("page") || "1";
        const url = `/api/forums/${slug}/topics/${topic.id}/messages/?page=${currentPage}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
        } else {
          throw new Error(response.status);
        }
      } catch (e) {
        setHasError(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    doGetMessages();
  }, []);

  return (
    <section className="okp-forum-messages">
      {(!hasError && !isLoading && messages.length) ? (
        messages.map((message) => (
          <article key={message.id} className="okp-messages-card">
            <header className="okp-messages-card-header">
              (author)
            </header>
            <div className="okp-messages-card-content">
              {message.content}
            </div>
            <footer>
              (footer)
            </footer>
          </article>
        ))
      ) : (!hasError && !isLoading && messages.length === 0) ? (
        <div>
          empty
        </div>
      ) : (!hasError && isLoading) ? (
        <div className="okp-loading">
          <div className="okp-loading-spinner okp-tripleline"></div>
        </div>
      ) : (
        <div>
          {{hasError}}
        </div>
      )}
    </section>
  );
}
