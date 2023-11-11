import { useEffect, useState } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import CoreLayout from "@/components/core/Layout";
import OkpHeader from "@/components/common/Header";
import OkpUserBanner from "@/components/common/UserBanner";
import imgOykus from "@/assets/img/oykus.jpg";
import imgHaven from "@/assets/img/haven.jpg";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  const [listUsers, setListUsers] = useState([]);

  const callApiCommunity = () => {
    setListUsers([1,2,3,4,5,6,7,8,9,10]);
  };

  useEffect(() => {
    callApiCommunity();
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
          {listUsers.map((user, index) => {
            return (
              <div key={`userbox-${index}`} className="col-12 col-sm-6 col-xl-3">
                <div style={{ backgroundColor: "var(--okp-core)", borderRadius: "6px", border: "1px solid var(--okp-line)", marginTop: "16px" }}>
                  <OkpUserBanner avatar={imgOykus} banner={imgHaven} height={110} avatarSize={120} bannerSize={72} radiusTop="6px" centeredBanner />
                  <h2 style={{ textAlign: "center", paddingBottom: "32px" }}>
                    <span>{`User #${user}`}</span>
                  </h2>
                </div>
              </div>
            )
          })}
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
