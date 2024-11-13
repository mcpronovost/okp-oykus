import { useContext } from "react";
import { LibraryBig, MessagesSquare, Scale, Users } from "lucide-react";
import { I18nContext } from "@/_libs/stores/I18nContext";
import { RouterContext } from "@/_libs/stores/RouterContext";

export default function OkpCoreLeftNavGame ({ slug }: { slug: string }) {
  const { t } = useContext(I18nContext);
  const { doRoute } = useContext(RouterContext);

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