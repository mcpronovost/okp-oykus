import { useNavigate } from "react-router-dom";

export default function ForumTopicCard({ topic }) {
  const navigate = useNavigate();

  function handleCardClick () {
    navigate(`/g/${topic.path}`);
  };

  return (
    <article className="okp-forum-section-topic">
      <div onClick={handleCardClick} className="okp-forum-section-topic-card">
        <header>
          <h3>{topic.title}</h3>
        </header>
      </div>
    </article>
  );
}
