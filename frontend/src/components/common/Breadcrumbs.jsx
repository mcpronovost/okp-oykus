import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function BreadcrumbsComponent({ crumbs }) {
  return (
    <>
      {!!crumbs && !!crumbs.length && (
        <nav className="okp-breadcrumbs">
          <Compass size={16} />
          <ul>
            {crumbs.map((c, i) => {
              return (
                <li key={`crumb-${i}`}>
                  {c.href ? (
                    <Link to={c.href}>{c.name}</Link>
                  ) : (
                    <span>{c.name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
