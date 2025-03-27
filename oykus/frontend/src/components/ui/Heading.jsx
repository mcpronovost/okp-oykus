import { OkpLink } from "@/components/ui";

export default function OkpHeading({ title, description, link, grid = false, tag = "h2" }) {
  const HeadingTag = tag;

  return (
    <header className={`okp-heading ${grid ? "okp-grid" : ""}`}>
      <HeadingTag className="okp-heading-title">
        {link ? <OkpLink href={link} className="okp-heading-title-link">{title}</OkpLink> : title}
      </HeadingTag>
      {description && (
        <div className="okp-heading-description">
          <p>{description}</p>
        </div>
      )}
    </header>
  );
}
