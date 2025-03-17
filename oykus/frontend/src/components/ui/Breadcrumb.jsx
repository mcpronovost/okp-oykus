import "@/assets/styles/ui/breadcrumb.scss";
import { Compass, ChevronRight } from "lucide-react";

export default function OkpBreadcrumb({ breadcrumb }) {
  if (!breadcrumb) return null;

  return (
    <nav className="okp-breadcrumb" aria-label="Breadcrumb">
      <Compass size={14} className="okp-breadcrumb-icon" />
      <ol className="okp-breadcrumb-list">
        {breadcrumb.map((item, index) => (
          <li key={item.name} className="okp-breadcrumb-list-item">
            <a href={item.url} className="okp-breadcrumb-list-item-link">
              {item.name}
            </a>
            {index < breadcrumb.length - 1 && (
              <ChevronRight size={12} className="okp-breadcrumb-list-item-icon" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}