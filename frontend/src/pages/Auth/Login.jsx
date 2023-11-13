import { getTranslation, getLang } from "@/plugins/i18n";
import OkpLayout from "@/components/core/Layout";
import OkpRouteLink from "@/components/common/RouteLink.jsx";
import imgLogo from "@/assets/img/oykus.png";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  const handleFormLogin = (e) => {
    e.preventDefault();
    console.log(e);
    return false;
  };

  return (
    <>
      <div id="okp-auth-login">
        <header className="okp-auth-login-header">
          <div className="okp-auth-login-logo">
            <img src={ imgLogo } alt="Oykus" width={100} height={100} />
          </div>
          <h1>{t("Sign in to Oykus")}</h1>
        </header>
        <div className="okp-core">
          <form className="okp-auth-login-form" method="get" onSubmit={(e) => { handleFormLogin(e) }}>
            <div>
              <label htmlFor="okp-login-username">{t("Username")}</label>
              <input type="text" id="okp-login-username" name="username" required />
            </div>
            <div>
              <label htmlFor="okp-login-password">{t("Password")}</label>
              <input type="password" id="okp-login-password" name="password" required />
            </div>
            <div>
              <button type="submit">{t("Sign in")}</button>
            </div>
          </form>
        </div>
        <footer className="okp-auth-login-footer">
          <span>{t("Don't have an account?")}</span>
          <OkpRouteLink route={`/${lang}${t("/auth/register")}/`} children={t("Create an account")} />
        </footer>
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
