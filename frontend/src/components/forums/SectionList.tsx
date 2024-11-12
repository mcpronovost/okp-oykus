import type { CategorySection } from "@/_libs/types/forums.types";
import { useContext } from "react";
import { AlertCircle } from "lucide-react";
import { I18nContext } from "@/_libs/stores/I18nContext";
import OkpForumSectionCard from "@/components/forums/SectionCard";

interface Props {
  sections: CategorySection[];
}

export default function OkpSectionsList ({ sections }: Props) {
  const { t } = useContext(I18nContext);

  return (
    <section className="okp-forum-sections">
      {(sections.length) ? sections.map((item) => (
        <OkpForumSectionCard key={item.id} section={item} />
      )) : (
        <div className="okp-forum-notfound" style={{ padding: "12px" }}>
          <div className="okp-forum-notfound-wrapper">
            <AlertCircle className="icon" />
            <h2>{t("No Sections Found")}</h2>
            <p>{t("It seems there are no sections available at the moment.")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
