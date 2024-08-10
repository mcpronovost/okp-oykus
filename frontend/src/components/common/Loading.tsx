import { getTrans } from "@/_lib/i18n";

export default function CommonLoading({ width, className }) {
  const t = getTrans();

  return (
    <div className="okp-container">
      <div className="okp-loading" style={{ borderWidth: width }}>
        {t("Loading")}...
      </div>
    </div>
  );
}
