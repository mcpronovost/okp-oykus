import "@/assets/styles/ui/button.scss";
import { LoaderCircle } from "lucide-react";

export default function OkpButton({
  children,
  prepend,
  append,
  variant = "default",
  colour = "default",
  size = "default",
  dashed = false,
  block = false,
  isLoading = false,
  isDisabled = false,
  className = "",
}) {
  const variants = ["default", "outline", "soft"];
  const colours = [
    "default",
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
  ];
  const sizes = ["default", "small"];

  const variantClass = variants.includes(variant)
    ? `okp-button-variant-${variant}`
    : "okp-button-variant-default";
  const colourClass = colours.includes(colour)
    ? `okp-button-colour-${colour}`
    : "okp-button-colour-default";
  const sizeClass = sizes.includes(size)
    ? `okp-button-size-${size}`
    : "okp-button-size-default";

  return (
    <button
      type="button"
      disabled={isDisabled || isLoading}
      className={`okp-button ${variantClass} ${colourClass} ${sizeClass} ${className} ${
        isLoading ? "okp-button-loading" : ""
      }`}
      style={{ width: block ? "100%" : "auto", borderStyle: dashed ? "dashed" : "solid" }}
    >
      <div className="okp-button-content">
        <span className="okp-button-content-prepend">{prepend}</span>
        <span className="okp-button-content-text">{children}</span>
        <span className="okp-button-content-append">{append}</span>
        {isLoading && (
          <span className="okp-button-content-loading">
            <LoaderCircle
              size={24}
              className="okp-button-content-loading-icon"
            />
          </span>
        )}
      </div>
    </button>
  );
}
