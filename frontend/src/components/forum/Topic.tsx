import type { Topic } from "@/types/forums.types";
import React, { useContext, useEffect, useState } from "react";
import GameContext from "@/stores/storeGame";
import OkpLoading from "@/components/ui/Loading";
import OkpForumHeader from "@/components/forum/common/Header";
import OkpMessagesList from "@/components/forum/MessagesList";

interface Props {
  slug: string;
  tpk: string;
}

export default function OkpForumTopic ({ slug, tpk }: Props) {
  const { messagesPerPage } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);

  async function getForumTopic () {
    setIsLoading(true);
    try {
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
            <OkpMessagesList slug={slug} topic={topic} />
          </section>
        )}
      </section>
    </div>
  );
}
