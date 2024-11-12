import type { Topic } from "@/_libs/types/forums.types";
import { useContext, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { I18nContext } from "@/_libs/stores/I18nContext";
import OkpPaginate from "@/components/common/Paginate";
import OkpMessageCard from "@/components/forums/MessageCard";

interface Props {
  slug: string;
  topic: Topic;
}

function getPageParam(topic: Topic) {
  const pageParam = new URLSearchParams(window.location.search).get("page");
  if (pageParam === "last") {
    return topic.total_pages.toString();
  }
  return pageParam || "1";
}

export default function MessagesView ({ slug, topic }: Props) {
  const { t } = useContext(I18nContext);
  // const { messagesPerPage } = useContext(GameContext);
  const messagesPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesPages, setMessagesPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(getPageParam(topic));
  const goToLastMessage = new URLSearchParams(window.location.search).get("page") === "last";

  const doGetMessages = async () => {
    if (isLoading) return;
    if (!isLoading || hasError) {
      setIsLoading(true);
      setHasError(null);
    }
    try {
      const query = await fetch(`/api/forums/${slug}/topics/${topic.id}/messages/?page=${currentPage}&size=${messagesPerPage}`);
      if (!query.ok) throw new Error("Failed to fetch data");

      const response = await query.json();
      if (!response) throw new Error("Messages not found");

      setMessages(response.messages);
      setMessagesPages(response.total_pages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPage = (page: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    history.pushState(null, "", url);
    setCurrentPage(page);
  };

  // const handleSelectPageSize = (e) => {
  //   messagesPerPage.set(e.value);
  // };

  // Scroll to last message
  useEffect(() => {
    const scrollToLastMessage = () => {
      if (!isLoading && messages.length > 0 && goToLastMessage) {
        const mainEl = document.querySelector("#okp-core-main .simplebar-content-wrapper");
        const lastMessage = document.querySelector(".okp-messages-card:last-child");
        if (mainEl && lastMessage) {
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

  // Get messages
  useEffect(() => {
    doGetMessages();
  }, [currentPage, messagesPerPage]);

  // Handle popstate
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
        <section className="okp-forum-messages">
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
