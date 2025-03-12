import "@/assets/styles/ui/_loading.scss";

export default function Loading({ variant = "circles" }) {
  const variants = ["squares", "layers", "circles"];

  if (!variants.includes(variant)) {
    variant = "circles";
  }

  return (
    <div className="okp-loading">
      <div className={`okp-loading-spinner okp-${variant}`}></div>
    </div>
  );
}
