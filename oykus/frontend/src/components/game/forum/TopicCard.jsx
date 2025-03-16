export default function OkpGameForumTopicCard({ topic }) {
  if (!topic) return null;

  console.log(topic);

  return (
    <section className="okp-forum-topic-card">
      <h3 className="okp-forum-topic-card-title">{topic.title}</h3>
    </section>
  );
}
