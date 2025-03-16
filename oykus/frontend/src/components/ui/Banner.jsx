import "@/assets/styles/ui/banner.scss";
import { useState } from "react";

export default function OkpBanner({ src, fallback, size = 120, className = "" }) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure
      aria-hidden="true"
      className={`okp-banner ${className}`}
      style={{ height: `${size}px` }}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={fallback || "Banner"}
          onError={() => setImgError(true)}
        />
      ) : (
        fallback && <span className="okp-banner-fallback">{fallback}</span>
      )}
    </figure>
  );
}
