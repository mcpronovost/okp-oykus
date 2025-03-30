import { theme } from "antd";

export default function OkpLoading({ variant = "circles", fullview = false }) {
  const { token } = theme.useToken();
  const variants = ["squares", "layers", "circles"];

  if (!variants.includes(variant)) {
    variant = "circles";
  }

  return (
    <div
      className={`okp-loading ${fullview ? "okp-loading-fullview" : ""}`}
      style={{
        "--c-primary": token.colorPrimaryText,
        "--c-secondary": token.colorBorder,
      }}
    >
      <div className={`okp-loading-spinner okp-${variant}`}></div>
    </div>
  );
}
