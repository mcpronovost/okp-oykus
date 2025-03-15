import "@/assets/styles/ui/avatar.scss";
import { useState } from "react";

export default function OkpAvatar({ src, fallback, className, size }) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure
      aria-hidden="true"
      className={`okp-avatar ${className}`}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={fallback || "Avatar"}
          onError={() => setImgError(true)}
        />
      ) : (
        fallback && <span className="okp-avatar-fallback">{fallback}</span>
      )}
    </figure>
  );
}
