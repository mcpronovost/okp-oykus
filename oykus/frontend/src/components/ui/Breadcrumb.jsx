import "@/assets/styles/ui/breadcrumb.scss";
import { Compass, ChevronRight } from "lucide-react";
import { theme } from "antd";
import { OkpLink } from "@/components/ui";

const { useToken } = theme;

export default function OkpBreadcrumb({ breadcrumb }) {
  if (!breadcrumb) return null;

  const { token } = useToken();

  return (
    <nav className="okp-breadcrumb" aria-label="Breadcrumb" style={{ color: token.colorTextSecondary }}>
      <Compass size={14} className="okp-breadcrumb-icon" />
      <ol className="okp-breadcrumb-list">
        {breadcrumb.map((item, index) => (
          <li key={item.name} className="okp-breadcrumb-list-item">
            <OkpLink href={item.url} className="okp-breadcrumb-list-item-link">
              {item.name}
            </OkpLink>
            {index < breadcrumb.length - 1 && (
              <ChevronRight size={12} className="okp-breadcrumb-list-item-icon" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}