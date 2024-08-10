import { getTrans } from "@/_lib/i18n";
import OkpHeader from "@/components/common/Header";
import OkpForumSectionCard from "@/components/forum/SectionCard";
import OkpBreadcrumbs from "@/components/common/Breadcrumbs";

export default function ForumCategory({ category, breadcrumbs, nolink }) {
  const t = getTrans();

  return (
    <section>
      <OkpHeader
        h="2"
        title={category.name}
        subtitle={category.description}
        href={nolink ? null : `/g/${category.path}`}
      >
        {!!breadcrumbs && <OkpBreadcrumbs crumbs={breadcrumbs} />}
      </OkpHeader>
      <div className="okp-forum-sections">
        {category.sections.length ? (
          category.sections.map((section) => {
            return (
              <OkpForumSectionCard
                h="3"
                key={`forum-section-${section.id}`}
                data={section}
              />
            );
          })
        ) : (
          <div className="okp-forum-sections-empty">
            <span>{t("Thiscategoryisempty")}</span>
          </div>
        )}
      </div>
    </section>
  );
}
