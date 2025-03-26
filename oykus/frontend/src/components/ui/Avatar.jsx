import { useState } from "react";
import { theme } from "antd";
import { okpContrast } from "@/utils/formatters";

const { useToken } = theme;

export default function OkpAvatar({
  src,
  fallback,
  selfCenter = true,
  size = 48,
  stroke = 8,
  strokeColor = null,
  color = null,
  top = 0,
  className = ""
}) {
  const { token } = useToken();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`okp-avatar ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, justifySelf: selfCenter ? "center" : "flex-start", top: `${top}px`, padding: `${stroke}px` }}
    >
      <figure
        aria-hidden="true"
        className="okp-avatar-figure"
        style={{
          background: color || token.colorFill,
          boxShadow: `0 0 1px ${stroke}px ${strokeColor || token.colorBgContainer}`,
          outlineWidth: `${stroke}px`,
          outlineColor: strokeColor || token.colorBgContainer,
          color: color ? okpContrast(color) : token.colorTextTertiary,
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
          fallback && <span className="okp-avatar-fallback" style={{ fontSize: `${size / 4}px` }}>{fallback}</span>
        )}
      </figure>
    </div>
  );
}
