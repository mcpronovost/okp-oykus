import React, { useEffect, useState, useRef } from "react";
import { useStore } from "@nanostores/react";
import { topicsPerPage } from "@/stores/storeForums";
import OkpTopicCard from "./TopicCard";
import OkpPaginate from "@/components/ui/Paginate";

export default function TopicsList ({ slug, section }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topicsPages, setTopicsPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    new URLSearchParams(window.location.search).get("page") || "1"
  );
  const $topicsPerPage = useStore(topicsPerPage);

  const doGetTopics = async () => {
    if (!isLoading || hasError) {
      setIsLoading(true);
      setHasError(null);
    }
    try {
      const url = `/api/forums/${slug}/sections/${section.id}/topics/?page=${currentPage}&size=${$topicsPerPage}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setTopics(data.topics);
      setTopicsPages(data.topics_pages);
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

  if (hasError) {
    return <div>{JSON.stringify(hasError)}</div>;
  }

  return (
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
      {(isLoading) ? (
        <section className="okp-loading">
          <div className="okp-loading-spinner okp-tripleline"></div>
        </section>
      ) : (
        <section className="okp-forum-topics">
          {topics.map((item, i) => (
            <OkpTopicCard key={i} topic={item} total={topics.length} index={i} />
          ))}
        </section>
      )}
    </>
  );
}