import { getTrans } from "@/_lib/i18n";

export default function CommonLoading({ border, size, className }) {
  const t = getTrans();

  return (
    <div className="okp-loading" style={{ borderWidth: border, width: size, height: size }}>
      {t("Loading")}...
    </div>
  );
}
