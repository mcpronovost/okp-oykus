// import "@/assets/styles/forum/categoryList.scss";
import { OkpForumTopicCard } from "@/components/forum";

export default function OkpForumTopicList({ topics, className }) {
  if (!topics) return null;

  return (
    <section className={`okp-forum-topics-list ${className}`}>
      {topics.map((topic) => (
        <OkpForumTopicCard key={topic.id} topic={topic} />
      ))}
    </section>
  );
}
