import { OkpGameForumTopicCard } from "@/components/game";

export default function OkpGameForumTopicList({ topics, className }) {
  if (!topics) return null;

  return (
    <section className={`okp-forum-topics-list ${className}`}>
      {topics.map((topic) => (
        <OkpGameForumTopicCard key={topic.id} topic={topic} />
      ))}
    </section>
  );
}
