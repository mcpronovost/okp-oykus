import { useNavigate } from "react-router-dom";

export default function ForumSectionCard({ section, h }) {
  const navigate = useNavigate();

  function handleCardClick () {
    navigate(`/g/${section.path}`);
  };

  return (
    <article className="okp-forum-category-section">
      <div onClick={handleCardClick} className="okp-forum-category-section-card">
        <header>
          {!h && <h2>{section.name}</h2>}
          {h == "3" && <h3>{section.name}</h3>}
          <p>{section.description}</p>
        </header>
      </div>
    </article>
  );
}
