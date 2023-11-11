import { useEffect, useState } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import OkpCoreLayout from "@/components/core/Layout";
import OkpHeader from "@/components/common/Header";
import OkpUserBanner from "@/components/common/UserBanner";
import OkpRouteLink from "@/components/common/RouteLink";
import OkpAlert from "@/components/common/Alert";
import OkpLoading from "@/components/common/Loading";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [listUsers, setListUsers] = useState([]);

  const callApiCommunityUsersList = async () => {
    setHasError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/community/users/list/`);
      const data = await response.json();
      if (response.ok && data.results) {
        setListUsers(data.results);
      } else {
        throw new Error(data.detail || t("Failed to read data"));
      }
    } catch (e) {
      setHasError(`${e.message || e}`);
      setListUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callApiCommunityUsersList();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <OkpHeader title={t("Community")} />
          </div>
        </div>
        <div className="row">
          {(!hasError && !isLoading && listUsers.length > 0) && listUsers.map((user, index) => {
            return (
              <div key={`userbox-${index}`} className="col-12 col-sm-6 col-xl-3">
                <OkpRouteLink route={`/${lang}${t("/community")}/u/${user.slug}/`} style={{ display: "block", height: "calc(100% - 6px)", marginTop: "6px" }}>
                  <div className="okp-core" style={{height: "100%" }}>
                    <OkpUserBanner avatar={user.avatar} banner={user.avatar} height={96} avatarSize={100} bannerSize={72} radiusTop="6px" centeredBanner />
                    <h2 style={{ fontSize: "1rem", textAlign: "center", paddingBottom: "16px" }}>
                      <span>{user.name}</span>
                    </h2>
                  </div>
                </OkpRouteLink>
              </div>
            )
          })}
          {(!hasError && isLoading) && (
            <div className="col">
              <OkpLoading />
            </div>
          )}
          {(hasError) && (
            <div className="col">
              <OkpAlert title={t("An error occurred.")} message={hasError} />
            </div>
          )}
        </div>
      </div>
    </>
  )
};

const View = () => {
  return (
    <OkpCoreLayout>
      <Content />
    </OkpCoreLayout>
  )
};

export default View;
