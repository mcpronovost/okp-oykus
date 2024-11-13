import type { Topic } from "@/_libs/types/forums.types";
import { useContext, useEffect, useState } from "react";
import { RouterContext } from "@/_libs/stores/RouterContext";
import OkpLoading from "@/components/common/Loading";
import OkpForumHeader from "@/components/forums/common/Header";
import OkpMessageList from "@/components/forums/MessageList";

export default function OkpForumsTopicView () {
  const { route, gameSlug } = useContext(RouterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const messagesPerPage = 10;

  async function getForumTopic () {
    setIsLoading(true);
    try {
      const tpk = route?.match(/\/t(\d+)-/)?.[1];
      if (!tpk) throw new Error("Topic not found");

      const query = await fetch(`/api/forums/${gameSlug}/topics/${tpk}/?size=${messagesPerPage}`);
      if (!query.ok) throw new Error("Failed to fetch data");
  
      const response = await query.json();
      if (!response) throw new Error("Section not found");

      setTopic(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForumTopic();
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <div className="okp-grid">
      <section className="okp-forum">
        {(!!gameSlug && topic) && (
          <section className="okp-forum-topic">
            <OkpForumHeader title={topic.name} />
            <OkpMessageList slug={gameSlug} topic={topic} />
          </section>
        )}
      </section>
    </div>
  );
}
