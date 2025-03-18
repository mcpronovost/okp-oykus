import "@/assets/styles/ui/avatar.scss";
import { useState } from "react";

export default function OkpAvatar({
  src,
  fallback,
  size = 48,
  stroke = 8,
  className = "",
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`okp-avatar ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, padding: `${stroke}px` }}
    >
      <figure
        aria-hidden="true"
        className="okp-avatar-figure"
        style={{
          outlineWidth: `${stroke}px`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={fallback || "Avatar"}
            onError={() => setImgError(true)}
            className="okp-avatar-image"
          />
        ) : (
          fallback && <span className="okp-avatar-fallback">{fallback}</span>
        )}
      </figure>
    </div>
  );
}
