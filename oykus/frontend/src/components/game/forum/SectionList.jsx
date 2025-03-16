import "@/assets/styles/forum/sectionList.scss";
import { OkpGameForumSectionCard } from "@/components/game";

export default function OkpGameForumSectionList({ sections, className }) {
  return (
    <section className={`okp-forum-section-list ${className}`}>
      {sections?.length > 0 ? sections.map((section) => (
        <OkpGameForumSectionCard key={section.id} section={section} tag="article" />
      )) : (
        <p>No sections found</p>
      )}
    </section>
  );
}
