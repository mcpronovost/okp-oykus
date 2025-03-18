import "@/assets/styles/ui/empty.scss";
import { Ghost } from "lucide-react";
import { useI18n } from "@/services/i18n";

export default function OkpEmpty({ text, subtext, children, className = "" }) {
  const { t } = useI18n();

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
