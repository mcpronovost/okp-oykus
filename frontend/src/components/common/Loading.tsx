import { getTrans } from "@/_lib/i18n";

export default function OkpLoading({ border, colour, size, className }) {
  const t = getTrans();

  return (
    <div
      className="okp-loading"
      style={{
        borderTopColor: `var(--okp-${!!colour ? colour : "primary"})`,
        borderWidth: border,
        width: size,
        height: size
      }}
    >
      {t("Loading")}...
    </div>
  );
}
