import { OkpLink } from "@/components/ui";

export default function OkpHeading({ title, description, link, actions, grid = false, tag = "h2" }) {
  const HeadingTag = tag;

  return (
    <header className={`okp-heading ${grid ? "okp-grid" : ""}`}>
      <div className="okp-heading-wrapper">
        <div className="okp-heading-content">
          <HeadingTag className="okp-heading-title">
            {link ? <OkpLink href={link} className="okp-heading-title-link">{title}</OkpLink> : title}
          </HeadingTag>
          {description && (
            <div className="okp-heading-description">
              <p>{description}</p>
            </div>
          )}
        </div>
        {actions && (
          <div className="okp-heading-actions">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
