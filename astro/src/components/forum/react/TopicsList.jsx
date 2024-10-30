import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { topicsPerPage } from "@/stores/storeForums.js";
import OkpTopicCard from "./TopicCard";
import OkpPaginate from "@/components/ui/Paginate";

export default function TopicsList ({ slug, section }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "1";
  });
  const [topics, setTopics] = useState([]);
  const [topicsPages, setTopicsPages] = useState(0);
  const $topicsPerPage = useStore(topicsPerPage);

  const doGetMessages = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setHasError(null);
      try {
        const url = `/api/forums/${slug}/sections/${section.id}/topics/?page=${currentPage}&size=${$topicsPerPage}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTopics(data.topics);
          setTopicsPages(data.topics_pages);
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
    topicsPerPage.set(e.value);
  };

  useEffect(() => {
    doGetMessages();
  }, [currentPage, $topicsPerPage]);

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
    <section className="okp-forum-topics-list">
      {(!hasError && !isLoading && topics.length) ? (
        <>
          <section className="okp-forum-topics-actions">
            <div className="okp-forum-topics-actions-writing">
              <button className="okp-btn okp-btn-primary okp-animate-boxup">
                <span>Nouveau</span>
              </button>
            </div>
            <div className="okp-forum-topics-actions-paginate">
              {topicsPages > 1 && <OkpPaginate pages={topicsPages} current={currentPage} onChange={handleSelectPage} />}
            </div>
          </section>
          <section className="okp-forum-topics">
            {topics.map((item, i) => (
              <OkpTopicCard key={i} topic={item} />
            ))}
          </section>
        </>
      ) : (!hasError && !isLoading && topics.length === 0) ? (
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