import { useNavigate } from "react-router-dom";

export default function ForumSectionCard({ section }) {
  const navigate = useNavigate();

  function handleCardClick () {
    navigate(`/g/${section.path}`);
  };

  return (
    <article className="okp-forum-sections-section">
      <div onClick={handleCardClick} className="okp-forum-sections-section-card">
        <header>
          <h3>{section.name}</h3>
          <p>{section.description}</p>
        </header>
      </div>
    </article>
  );
}
