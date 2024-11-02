import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { messagesPerPage } from "@/stores/storeForums.js";
import OkpPaginate from "@/components/ui/Paginate";
import OkpMessageCard from "./MessageCard";

export default function MessagesView ({ slug, topic}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesPages, setMessagesPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    new URLSearchParams(window.location.search).get("page") || "1"
  );
  const $messagesPerPage = useStore(messagesPerPage);

  const doGetMessages = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setHasError(null);
    try {
      const url = `/api/forums/${slug}/topics/${topic.id}/messages/?page=${currentPage}&size=${$messagesPerPage}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.status);
      
      const data = await response.json();
      setMessages(data.messages);
      setMessagesPages(data.messages_pages);
    } catch (e) {
      setHasError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPage = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    history.pushState(null, "", url);
    setCurrentPage(page);
  };

  const handleSelectPageSize = (e) => {
    messagesPerPage.set(e.value);
  };

  useEffect(() => {
    doGetMessages();
  }, [currentPage, $messagesPerPage]);

  useEffect(() => {
    const handlePopState = () => {
      const page = new URLSearchParams(window.location.search).get("page") || "1";
      setCurrentPage(page);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <section className="okp-forum-messages">
      {(!hasError && !isLoading && messages.length) ? (
        <>
          <section className="okp-forum-messages-actions">
            <div className="okp-forum-messages-actions-writing">
              <button className="okp-btn okp-btn-primary okp-animate-boxup">
                <span>Nouveau</span>
              </button>
              <button className="okp-btn okp-animate-boxup">
                <span>Répondre</span>
              </button>
            </div>
            <div className="okp-forum-messages-actions-paginate">
              {messagesPages > 1 && <OkpPaginate pages={messagesPages} current={currentPage} onChange={handleSelectPage} />}
            </div>
          </section>
          {messages.map((item, i) => (
            <OkpMessageCard key={i} message={item} />
          ))}
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
          {JSON.stringify(hasError)}
        </div>
      )}
    </section>
  );
}
