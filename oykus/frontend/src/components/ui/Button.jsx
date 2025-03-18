import "@/assets/styles/ui/button.scss";

export default function OkpButton({
  children,
  variant = "default",
  colour = "default",
  size = "default",
  className = "",
}) {
  const variants = ["default", "outline"];
  const colours = ["default", "primary", "success", "warning", "error"];
  const sizes = ["default", "small"];

  const variantClass = variants.includes(variant) ? `okp-button-variant-${variant}` : "okp-button-variant-default";
  const colourClass = colours.includes(colour) ? `okp-button-colour-${colour}` : "okp-button-colour-default";
  const sizeClass = sizes.includes(size) ? `okp-button-size-${size}` : "okp-button-size-default";

  return (
    <button className={`okp-button ${variantClass} ${colourClass} ${sizeClass} ${className}`}>
      <span className="okp-button-content">{children}</span>
    </button>
  );
}
