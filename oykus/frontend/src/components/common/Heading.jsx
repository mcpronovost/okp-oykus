import "@/assets/styles/common/heading.scss";

export default function OkpHeading({ title, description, link, tag = "h2" }) {
  const HeadingTag = tag;

  return (
    <header className="okp-heading">
      <HeadingTag className="okp-heading-title">
        {link ? <a href={link} className="okp-heading-title-link">{title}</a> : title}
      </HeadingTag>
      {description && (
        <div className="okp-heading-description">
          <p>{description}</p>
        </div>
      )}
    </header>
  );
}
