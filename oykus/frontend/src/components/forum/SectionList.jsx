import "@/assets/styles/forum/sectionList.scss";
import { OkpForumSectionCard } from "@/components/forum";

export default function OkpForumSectionList({ sections, className }) {
  return (
    <section className={`okp-forum-section-list ${className}`}>
      {sections?.length > 0 ? sections.map((section) => (
        <OkpForumSectionCard key={section.id} section={section} tag="article" />
      )) : (
        <p>No sections found</p>
      )}
    </section>
  );
}
