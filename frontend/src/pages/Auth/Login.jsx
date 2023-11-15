import { useContext, useState } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import OkpLayout from "@/components/core/Layout";
import OkpRouteLink from "@/components/common/RouteLink.jsx";
import OkpAlert from "@/components/common/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import imgLogo from "@/assets/img/oykus.png";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { setStoreUser, delStoreUser } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleFormLogin = async (e) => {
    e.preventDefault();
    delStoreUser();
    setHasError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.valid) {
        setStoreUser({
          ...data.user,
          "rat": data.token
        });
        window.location.href = `/${lang}/`;
      } else if (data.non_field_errors) {
        throw new Error(t("Invalid credentials"));
      } else {
        throw new Error(data.non_field_errors || t("Failed to send form"));
      }
    } catch (e) {
      setHasError(`${e.message || e || t("An error occurred")}`);
    } finally {
      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      <div id="okp-auth-login">
        <header className="okp-auth-login-header">
          <div className="okp-auth-login-logo">
            <img src={ imgLogo } alt="Oykus" width={72} height={72} />
          </div>
          <h1>{t("Log in to Oykus")}</h1>
        </header>
        <div className="okp-core">
          <form className="okp-auth-login-form" method="get" onSubmit={(e) => { handleFormLogin(e) }}>
            <div>
              <label htmlFor="okp-login-username">{t("Username")}</label>
              <input type="text" id="okp-login-username" name="username" value={formData.username} disabled={isLoading} required onChange={handleChangeInput} />
            </div>
            <div>
              <label htmlFor="okp-login-password">{t("Password")}</label>
              <input type="password" id="okp-login-password" name="password" value={formData.password} disabled={isLoading} required onChange={handleChangeInput} />
            </div>
            {(hasError) && (
              <div className="pb-2">
                <OkpAlert title={t("An error occurred")} message={hasError} />
              </div>
            )}
            <div className="pt-2">
              <button type="submit" disabled={isLoading}>
                {(!isLoading) && (<span>{t("Log in")}</span>)}
                {(isLoading) && (<span><FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse" /></span>)}
              </button>
            </div>
          </form>
        </div>
        <footer className="okp-auth-login-footer">
          <span>{t("Don't have an account?")}</span>
          <OkpRouteLink route={`/${lang}${t("/auth/register")}/`} children={t("Sign up")} />
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
