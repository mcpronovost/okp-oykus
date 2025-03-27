import { Ghost } from "lucide-react";
import { useTranslation } from "@/services/translation";

export default function OkpEmpty({ text, subtext, children, className = "" }) {
  const { t } = useTranslation();

  return (
    <aside className={`okp-empty ${className}`}>
      <div aria-hidden="true" className="okp-empty-icon">
        <Ghost size={32} />
      </div>
      <p className="okp-empty-text">{text || t("No results found")}</p>
      {subtext && <p className="okp-empty-subtext">{subtext}</p>}
      {children && <div className="okp-empty-actions">{children}</div>}
    </aside>
  );
}
