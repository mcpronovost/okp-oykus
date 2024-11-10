import type { CategorySection } from "@/_libs/types/forums.types";
import React, { useContext } from "react";
import { AlertCircle } from "lucide-react";
import { getTranslation } from "@/_libs/i18n";
import WebContext from "@/_libs/store/storeWeb";
import OkpForumSectionCard from "@/components/forums/SectionCard";

interface Props {
  sections: CategorySection[];
}

export default function OkpSectionsList ({ sections }: Props) {
  const { lang } = useContext(WebContext);
  const t = getTranslation(lang);

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
