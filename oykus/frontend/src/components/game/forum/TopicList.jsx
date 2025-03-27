import { OkpEmpty } from "@/components/ui";
import { OkpGameForumTopicCard } from "@/components/game";

export default function OkpGameForumTopicList({ topics, className = "" }) {
  return (
    <section className={`okp-forum-topic-list ${className}`}>
      <div className="okp-forum-topic-list-wrapper">
        {topics?.length > 0 ? topics.map((topic, index) => (
          <OkpGameForumTopicCard key={topic.id} topic={topic} total={topics.length} index={index} />
        )) : (
          <OkpEmpty text="No topics found" subtext="Create a new topic to get started." />
        )}
      </div>
    </section>
  );
}
