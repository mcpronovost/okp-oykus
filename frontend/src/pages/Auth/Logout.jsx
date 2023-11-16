import { useContext, useEffect } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import OkpLayout from "@/components/core/Layout";
import OkpLoading from "@/components/common/Loading";
import imgLogo from "@/assets/img/oykus.png";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { user, delStoreUser } = useContext(StoreContext);

  const handleLogout = async () => {
    const rat = user.rat;
    delStoreUser();
    try {
      await fetch(`${import.meta.env.VITE_DOMAIN}/api/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${rat}`
        },
        body: JSON.stringify({})
      });
    } finally {
      window.location.href = `/${lang}/`;
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <>
      <div id="okp-auth-logout">
        <header className="okp-auth-logout-header">
          <div className="okp-auth-logout-logo">
            <img src={imgLogo} alt="Oykus" width={72} height={72} />
          </div>
          <h1>{t("Logout...")}</h1>
        </header>
        <OkpLoading />
      </div>
    </>
  );
};

const View = () => {
  return (
    <OkpLayout fullview>
      <Content />
    </OkpLayout>
  );
};

export default View;
