import { useNavigate } from "react-router-dom";

export default function OkpHeader({ children, h, title, subtitle, href }) {
  const navigate = useNavigate();

  function handleCategoryClick (path) {
    if (!!href) navigate(path);
  };

  return (
    <header className="okp-header">
      <div className="okp-header-titles">
        {!h && <h1 onClick={() => handleCategoryClick(href)} className={`okp-header-title ${!!href ? "okp-link" : ""}`}>{title}</h1>}
        {h == "2" && <h2 onClick={() => handleCategoryClick(href)} className={`okp-header-title ${!!href ? "okp-link" : ""}`}>{title}</h2>}
        {!!subtitle && <p className="okp-header-subtitle">{subtitle}</p>}
      </div>
      {children}
    </header>
  );
}
