import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useStore } from "@nanostores/react";
import { messagesPerPageStore } from "@/stores/storeForums.js";
import OkpPaginate from "@/components/ui/Paginate";

export default function MessagesView ({ slug, topic}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "1";
  });
  const [messages, setMessages] = useState([]);
  const [messagesPages, setMessagesPages] = useState(0);
  const messagesPerPage = useStore(messagesPerPageStore);

  const doGetMessages = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setHasError(null);
      try {
        const url = `/api/forums/${slug}/topics/${topic.id}/messages/?page=${currentPage}&size=${messagesPerPage}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
          setMessagesPages(data.messages_pages);
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

  const handleSelectPage = (e) => {
    const url = new URL(window.location)
    url.searchParams.set("page", e)
    history.pushState(null, "", url);
    setCurrentPage(e);
  };

  const handleSelectPageSize = (e) => {
    messagesPerPageStore.set(e.value);
  };

  useEffect(() => {
    doGetMessages();
  }, [currentPage, messagesPerPage]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get("page") || "1";
      setCurrentPage(page);
    };

    // Listen to popstate event for back/forward navigation
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <section className="okp-forum-messages">
      {(!hasError && !isLoading && messages.length) ? (
        <>
          {messagesPages > 1 && <OkpPaginate pages={messagesPages} current={currentPage} onChange={handleSelectPage} />}
          {messages.map((message) => (
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
          ))}
          <div>
            <Select
              defaultValue={{value: messagesPerPage, label: messagesPerPage}}
              options={[{value: "2", label: "2"}, {value: "4", label: "4"}, {value: "10", label: "10"}]}
              onChange={handleSelectPageSize}
            />
          </div>
        </>
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
