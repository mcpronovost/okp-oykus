import { useContext } from "react";
import { I18nContext } from "@/_libs/stores/I18nContext";
import { AlertCircle } from "lucide-react";

export default function OkpNotFound(): JSX.Element {
  const { t } = useContext(I18nContext);

  return (
    <div className="okp-grid">
      <div className="okp-forum-notfound">
        <div className="okp-forum-notfound-wrapper">
          <AlertCircle className="icon" />
          <h2>{t("Page Not Found")}</h2>
          <p>{t("The page you're looking for doesn't exist or has been moved.")}</p>
        </div>
      </div>
    </div>
  );
}