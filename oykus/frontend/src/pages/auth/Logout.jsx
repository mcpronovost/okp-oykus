import "@/assets/styles/page/auth/login.scss";
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
  }, [logout, setUser, lang]);

  return (
    <div className="okp-auth-logout">
      <Card cover={<OkpBanner src="https://placehold.co/400x200" size="200" blur={0} />}>
        <header className="okp-auth-login-header">
          <h1 className="okp-auth-login-header-title">{t("Logout")}</h1>
        </header>
        <div className="okp-auth-login-content">
          <OkpLoading />
        </div>
      </Card>
    </div>
  );
}
