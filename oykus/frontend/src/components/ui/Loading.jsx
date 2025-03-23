import { theme } from "antd";

export default function OkpLoading({ variant = "circles" }) {
  const { token } = theme.useToken();
  const variants = ["squares", "layers", "circles"];

  if (!variants.includes(variant)) {
    variant = "circles";
  }

  return (
    <div
      className="okp-loading"
      style={{
        "--c-primary": token.colorPrimaryText,
        "--c-secondary": token.colorBorder,
      }}
    >
      <div className={`okp-loading-spinner okp-${variant}`}></div>
    </div>
  );
}
