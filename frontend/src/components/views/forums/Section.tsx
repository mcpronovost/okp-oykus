import type { Section } from "@/_libs/types/forums.types";
import React, { useEffect, useState } from "react";
import OkpLoading from "@/components/common/Loading";
import OkpForumHeader from "@/components/forums/common/Header";
import OkpTopicList from "@/components/forums/TopicList";

interface Props {
  slug?: string;
  uri?: string;
}

export default function OkpForumsSectionView ({ slug, uri }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState<Section | null>(null);

  async function getForumSection () {
    setIsLoading(true);
    try {
      const spk = uri?.match(/\/s(\d+)-/)?.[1];
      if (!spk) throw new Error("Section not found");

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
            <OkpTopicList slug={slug} section={section} />
          </section>
        )}
      </section>
    </div>
  );
}
