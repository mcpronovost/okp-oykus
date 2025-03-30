import { theme } from "antd";
import { Ghost } from "lucide-react";
import { useTranslation } from "@/services/translation";

const { useToken } = theme;

export default function OkpEmpty({ text, subtext, icon, children, className = "" }) {
  const { t } = useTranslation();
  const { token } = useToken();
  return (
    <aside className={`okp-empty ${className}`} style={{ borderColor: token.colorBorder, borderRadius: token.borderRadiusLG }}>
      <div aria-hidden="true" className="okp-empty-icon" style={{ borderColor: token.colorBorder }}>
        {icon || <Ghost size={32} />}
      </div>
      <p className="okp-empty-text">{text || t("No results found")}</p>
      {subtext && <p className="okp-empty-subtext">{subtext}</p>}
      {children && <div className="okp-empty-actions">{children}</div>}
    </aside>
  );
}
