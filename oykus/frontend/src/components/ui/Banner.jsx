import "@/assets/styles/ui/banner.scss";
import { useState } from "react";

export default function OkpBanner({ src, alt, size = 120, className = "" }) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure
      aria-hidden="true"
      className={`okp-banner ${className}`}
      style={{ height: `${size}px` }}
    >
      {(src && !imgError) && (
        <img
          src={src}
          alt={alt || "Banner"}
          onError={() => setImgError(true)}
        />
      )}
    </figure>
  );
}
