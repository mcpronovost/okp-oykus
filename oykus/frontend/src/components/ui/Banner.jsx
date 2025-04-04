import { useState } from "react";
import { theme } from "antd";

const { useToken } = theme;

export default function OkpBanner({
  src,
  alt,
  fade,
  size = 120,
  radius = 4,
  opacity = 1,
  blur = 4,
  className = "",
}) {
  const { token } = useToken();
  const [imgError, setImgError] = useState(false);

  return (
    <figure
      aria-hidden="true"
      className={`okp-banner ${className}`}
      style={{
        background: fade ? "transparent" : token.colorFill,
        height: `${size}px`,
        borderTopLeftRadius: `${radius}px`,
        borderTopRightRadius: `${radius}px`,
      }}
    >
      {src && !imgError && (
        <img
          src={src}
          alt={alt || "Banner"}
          onError={() => setImgError(true)}
          style={{
            opacity,
            transform: `scale(${blur > 0 ? 1.1 : 1})`,
            filter: `blur(${blur}px)`,
          }}
        />
      )}
    </figure>
  );
}
