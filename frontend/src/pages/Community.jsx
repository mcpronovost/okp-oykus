import { useEffect, useState } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";
import OkpHeader from "@/components/common/Header";
import OkpUserBanner from "@/components/common/UserBanner";
import OkpRouteLink from "@/components/common/RouteLink";
import OkpLoading from "@/components/common/Loading";
import imgOykus from "@/assets/img/oykus.jpg";
import imgHaven from "@/assets/img/haven.jpg";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  const [isLoading, setIsLoading] = useState(true);
  const [listUsers, setListUsers] = useState([]);

  const callApiCommunityUsersList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/community/users/list/`);
      const data = await response.json();
      if (response.ok && data.results) {
        setListUsers(data.results);
      } else {
        throw new Error(data.detail);
      }
    } catch (e) {
      console.log("e : ", e.message);
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
          {(!isLoading && listUsers.length > 0) && listUsers.map((user, index) => {
            return (
              <div key={`userbox-${index}`} className="col-12 col-sm-6 col-xl-3">
                <OkpRouteLink route={`/${lang}${t("/community")}/u/${user.slug}/`}>
                  <div style={{ backgroundColor: "var(--okp-core)", borderRadius: "6px", border: "1px solid var(--okp-line)", height: "100%", marginTop: "16px" }}>
                    <OkpUserBanner avatar={imgOykus} banner={imgHaven} height={110} avatarSize={120} bannerSize={72} radiusTop="6px" centeredBanner />
                    <h2 style={{ textAlign: "center", paddingBottom: "32px" }}>
                      <span>{user.name}</span>
                    </h2>
                  </div>
                </OkpRouteLink>
              </div>
            )
          })}
          {isLoading && (
            <OkpLoading />
          )}
        </div>
      </div>
    </>
  )
};

const View = () => {
  return (
    <CoreLayout>
      <Content />
    </CoreLayout>
  )
};

export default View;
