import "@/assets/styles/common/heading.scss";

export default function OkpHeading({ title, description, tag = "h1" }) {
  const HeadingTag = tag;

  return (
    <header className="okp-heading">
      <HeadingTag className="okp-heading-title">{title}</HeadingTag>
      {description && (
        <div className="okp-heading-description">
          <p>{description}</p>
        </div>
      )}
    </header>
  );
}
