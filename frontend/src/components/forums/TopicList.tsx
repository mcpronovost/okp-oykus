import type { Section, SectionTopic } from "@/_libs/types/forums.types";
import React, { useContext, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { getTranslation } from "@/_libs/i18n";
import WebContext from "@/_libs/store/storeWeb";
import GameContext from "@/_libs/store/storeGame";
import OkpLoading from "@/components/common/Loading";
import OkpPaginate from "@/components/common/Paginate";
import OkpTopicCard from "@/components/forums/TopicCard";

interface Props {
  slug: string;
  section: Section;
}

export default function TopicsList ({ slug, section }: Props) {
  const { lang } = useContext(WebContext);
  const { topicsPerPage } = useContext(GameContext);
  const t = getTranslation(lang);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [topics, setTopics] = useState<SectionTopic[]>([]);
  const [topicsPages, setTopicsPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    new URLSearchParams(window.location.search).get("page") || "1"
  );

  const doGetTopics = async () => {
    if (isLoading) return;
    if (!isLoading || hasError) {
      setIsLoading(true);
      setHasError(null);
    }
    try {
      const query = await fetch(`/api/forums/${slug}/sections/${section.id}/topics/?page=${currentPage}&size=${topicsPerPage}`);
      if (!query.ok) throw new Error("Failed to fetch data");

      const response = await query.json();
      if (!response) throw new Error("Topics not found");

      setTopics(response.topics);
      setTopicsPages(response.topics_pages);
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

  useEffect(() => {
    doGetTopics();
  }, [currentPage]);

  // Handle popstate
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
        <OkpLoading />
      ) : (
        <section className="okp-forum-topics">
          {topics.length ? topics.map((item, i) => (
            <OkpTopicCard key={i} topic={item} total={topics.length} index={i} />
          )) : (
            <div className="okp-forum-notfound">
              <div className="okp-forum-notfound-wrapper">
                <AlertCircle className="icon" />
                <h2>{t("No Topics Found")}</h2>
                <p>{t("It seems there are no topics available at the moment.")}</p>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}