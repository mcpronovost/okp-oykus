import { createElement } from "react";
import { useNavigate } from "react-router-dom";

export default function OkpHeader({ children, h, title, subtitle, href }) {
  const navigate = useNavigate();

  function handleCategoryClick(path) {
    if (!!href) navigate(path);
  }

  return (
    <header className="okp-header">
      <div className="okp-header-titles">
        {createElement(
          `h${h || "1"}`,
          {
            className: `okp-header-title ${!!href ? "okp-link" : undefined}`,
          },
          createElement(
            "span",
            {
              onClick: () => handleCategoryClick(href),
              className: !!href ? "okp-header-title-link" : undefined,
            },
            title
          )
        )}
        {!!subtitle && <p className="okp-header-subtitle">{subtitle}</p>}
      </div>
      {children}
    </header>
  );
}
