import React, { useEffect, useState, useRef } from "react";
import { useStore } from "@nanostores/react";
import { topicsPerPage } from "@/stores/storeForums.js";
import OkpTopicCard from "./TopicCard";
import OkpPaginate from "@/components/ui/Paginate";

export default function TopicsList ({ slug, section }) {
  const renderCount = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topicsPages, setTopicsPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    new URLSearchParams(window.location.search).get("page") || "1"
  );
  const $topicsPerPage = useStore(topicsPerPage);

  const doGetTopics = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setHasError(null);
    try {
      const url = `/api/forums/${slug}/sections/${section.id}/topics/?page=${currentPage}&size=${$topicsPerPage}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setTopics(data.topics);
      setTopicsPages(data.topics_pages);
      setIsLoading(false);
    } catch (e) {
      setHasError(e);
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
    topicsPerPage.set(e.value);
  };

  useEffect(() => {
    doGetTopics();
  }, [currentPage, $topicsPerPage]);

  useEffect(() => {
    const handlePopState = () => {
      const page = new URLSearchParams(window.location.search).get("page") || "1";
      setCurrentPage(page);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    renderCount.current += 1;
    console.log('>> TopicsList render', renderCount.current);
  });

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