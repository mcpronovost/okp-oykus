import type { Section } from "@/types/forums.types";
import React, { useEffect, useState } from "react";
import OkpLoading from "@/components/ui/Loading";
import OkpForumHeader from "@/components/forum/common/Header";
import OkpTopicsList from "@/components/forum/TopicsList";

interface Props {
  slug: string;
  spk: string;
}

export default function OkpForumSection ({ slug, spk }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState<Section | null>(null);

  async function getForumSection () {
    setIsLoading(true);
    try {
      const query = await fetch(`/api/forums/${slug}/sections/${spk}/`);
      if (!query.ok) throw new Error("Failed to fetch data");
  
      const response = await query.json();
      if (!response) throw new Error("Section not found");

      setSection(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForumSection();
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <div className="okp-grid">
      <section className="okp-forum">
        {(section) && (
          <section className="okp-forum-section">
            <OkpForumHeader title={section.name} description={section.description} />
            <OkpTopicsList slug={slug} section={section} />
          </section>
        )}
      </section>
    </div>
  );
}
