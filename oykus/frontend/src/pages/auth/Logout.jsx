import "@/assets/styles/page/auth/logout.scss";
import { useEffect } from "react";
import { Card } from "antd";
import { okpApi } from "@/services/api";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import { OkpBanner, OkpLoading } from "@/components/ui";

export default function OkpAuthLogout() {
  const { setUser, setRat } = useAuth();
  const { t, lang } = useTranslation();

  useEffect(() => {
    okpApi.logout().finally(() => {
      setUser(null);
      setRat(null);
      window.location.href = `/${lang}/`;
    });
  }, [setUser, setRat, lang]);

  return (
    <div className="okp-auth-logout">
      <Card>
        <header className="okp-auth-logout-header">
          <h1 className="okp-auth-logout-header-title">{t("Logout")}</h1>
        </header>
        <div className="okp-auth-logout-content">
          <OkpLoading />
        </div>
      </Card>
    </div>
  );
}
