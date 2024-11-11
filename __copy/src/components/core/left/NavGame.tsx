import React, { useContext } from "react";
import { LibraryBig, MessagesSquare, Scale, Users } from "lucide-react";
import { getTranslation } from "@/_libs/i18n";
import WebContext from "@/_libs/store/storeWeb";
import RouteContext from "@/_libs/store/storeRoute";

export default function OkpCoreLeftNavGame ({ slug }: { slug: string }) {
  const { lang } = useContext(WebContext);
  const { doRoute } = useContext(RouteContext);
  const t = getTranslation(lang);

  console.log("lang", lang);
  console.log("doRoute", doRoute);

  return (
    <ul className="okp-left-game">
      <li>
        <a href={`/g/${slug}/rules`} onClick={doRoute}>
          <span className="okp-icon" aria-hidden="true">
            <Scale size={24} />
          </span>
          <span className="okp-text">
            {t("Rules")}
          </span>
        </a>
      </li>
      <li>
        <a href={`/g/${slug}/lore`} onClick={doRoute}>
          <span className="okp-icon" aria-hidden="true">
            <LibraryBig size={24} />
          </span>
          <span className="okp-text">
            {t("Lore")}
          </span>
        </a>
      </li>
      <li>
        <a href={`/g/${slug}`} onClick={doRoute}>
          <span className="okp-icon" aria-hidden="true">
            <MessagesSquare size={24} />
          </span>
          <span className="okp-text">
            {t("Forum")}
          </span>
        </a>
      </li>
      <li>
        <a href={`/g/${slug}/community`} onClick={doRoute}>
          <span className="okp-icon" aria-hidden="true">
            <Users size={24} />
          </span>
          <span className="okp-text">
            {t("Community")}
          </span>
        </a>
      </li>
    </ul>
  );
}