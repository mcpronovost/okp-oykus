import "@/assets/styles/forum/sectionCard.scss";

export default function OkpForumSectionCard({ section, tag = "section" }) {
  if (!section) return null;

  const OkpSectionTag = tag;

  return (
    <OkpSectionTag className={`okp-forum-section-card okp-flex-${section.flex || 50}`} key={section.id}>
      <div className="okp-forum-section-card-box">
        <h3 className="okp-forum-section-title">
          <a href={section.url}>{section.title}</a>
        </h3>
        <div className="okp-forum-section-content">aaa</div>
      </div>
    </OkpSectionTag>
  );
}
