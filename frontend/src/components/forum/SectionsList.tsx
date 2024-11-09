import type { CategorySection } from "@/types/forums.types";
import React from "react";
import { useStore } from "@nanostores/react";
import { AlertCircle } from "lucide-react";
import { getTranslation } from "@/i18n/i18n";
import { lang } from "@/stores/storeWeb";
import OkpForumSectionCard from "@/components/forum/SectionCard";

interface Props {
  sections: CategorySection[];
}

export default function OkpSectionsList ({ sections }: Props) {
  const $lang = useStore(lang);
  const t = getTranslation($lang);

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
