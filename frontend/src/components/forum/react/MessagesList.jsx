import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { AlertCircle } from "lucide-react";
import { getTranslation } from "@/i18n/i18n";
import { messagesPerPage } from "@/stores/storeForums";
import OkpPaginate from "@/components/ui/Paginate";
import OkpMessageCard from "./MessageCard";

function getPageParam(topic) {
  const pageParam = new URLSearchParams(window.location.search).get("page");
  if (pageParam === "last") {
    return topic.total_pages.toString();
  }
  return pageParam || "1";
}

export default function MessagesView ({ lang, slug, topic }) {
  const t = getTranslation(lang);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesPages, setMessagesPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(getPageParam(topic));
  const goToLastMessage = new URLSearchParams(window.location.search).get("page") === "last";
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
      setMessagesPages(data.total_pages);
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

  // const handleSelectPageSize = (e) => {
  //   messagesPerPage.set(e.value);
  // };

  useEffect(() => {
    const scrollToLastMessage = () => {
      if (!isLoading && messages.length > 0 && goToLastMessage) {
        const mainEl = document.querySelector("#okp-core-main .simplebar-content-wrapper");
        const lastMessage = document.querySelector(".okp-messages-card:last-child");
        if (lastMessage) {
          const viewportHeight = window.innerHeight;
          const elementRect = lastMessage.getBoundingClientRect();
          const scrollTo = window.scrollY + elementRect.top - ((viewportHeight / 4) * 1);
          mainEl.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
      }
    };

    scrollToLastMessage();
  }, [isLoading, messages, currentPage]);

  useEffect(() => {
    doGetMessages();
  }, [currentPage, $messagesPerPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageParam(topic));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <section className="okp-forum-messages-actions">
        <div className="okp-forum-messages-actions-writing">
          <button className="okp-btn okp-btn-primary okp-animate-boxup">
            <span>{t("New Topic")}</span>
          </button>
          <button className="okp-btn okp-animate-boxup">
            <span>{t("Reply")}</span>
          </button>
        </div>
        <div className="okp-forum-messages-actions-paginate">
          {messagesPages > 1 && <OkpPaginate pages={messagesPages} current={currentPage} onChange={handleSelectPage} />}
        </div>
      </section>
      {(isLoading) ? (
        <section className="okp-loading">
          <div className="okp-loading-spinner okp-tripleline"></div>
        </section>
      ) : (
        <section className="okp-forum-topics">
          {messages.length ? messages.map((item, i) => (
            <OkpMessageCard key={i} message={item} />
          )) : (
            <div className="okp-forum-notfound">
              <div className="okp-forum-notfound-wrapper">
                <AlertCircle className="icon" />
                <h2>{t("No Messages Found")}</h2>
                <p>{t("It seems there are no messages available at the moment.")}</p>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
