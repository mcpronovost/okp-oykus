import type { Topic } from "@/_libs/types/forums.types";
import React, { useContext, useEffect, useState } from "react";
import GameContext from "@/_libs/store/storeGame";
import OkpLoading from "@/components/common/Loading";
import OkpForumHeader from "@/components/forums/common/Header";
import OkpMessageList from "@/components/forums/MessageList";

interface Props {
  slug?: string;
  uri?: string;
}

export default function OkpForumsTopicView ({ slug, uri }: Props) {
  const { messagesPerPage } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);

  async function getForumTopic () {
    setIsLoading(true);
    try {
      const tpk = uri?.match(/\/t(\d+)-/)?.[1];
      if (!tpk) throw new Error("Topic not found");

      const query = await fetch(`/api/forums/${slug}/topics/${tpk}/?size=${messagesPerPage}`);
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
        {(topic) && (
          <section className="okp-forum-topic">
            <OkpForumHeader title={topic.name} />
            <OkpMessageList slug={slug} topic={topic} />
          </section>
        )}
      </section>
    </div>
  );
}
