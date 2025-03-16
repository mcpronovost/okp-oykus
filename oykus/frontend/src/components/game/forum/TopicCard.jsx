import "@/assets/styles/forum/topicCard.scss";

export default function OkpGameForumTopicCard({ topic, total, index }) {
  if (!topic) return null;

  const flexModulo = total % 4;
  const flex = flexModulo > 0 && index < flexModulo ? `okp-flex-${Math.floor(100 / flexModulo)}` : "";

  return (
    <article className={`okp-forum-topic-card ${flex}`}>
      <div className="okp-forum-topic-card-box">
        <h3 className="okp-forum-topic-card-title">{topic.title}</h3>
      </div>
    </article>
  );
}
