import { useContext, useState } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import CoreLayout from "@/components/core/Layout";
import CommonHeader from "@/components/common/Header";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen, setStoreSidebarOpen } = useContext(StoreContext);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <CommonHeader title={t("FAQ")} />
            <div style={{ backgroundColor: "var(--okp-core)", borderRadius: "6px", border: "1px solid var(--okp-line)", padding: "32px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quis urna sed mollis.Fusce lobortis feugiat tellus eget elementum. Proin sagittis ullamcorper ipsum non tincidunt. Vivamus et risus turpis. Curabitur hendrerit nisl quis neque sodales ultricies. Morbi lacinia elit facilisis mauris volutpat malesuada. Nulla sit amet dictum turpis. Nunc urna ante, hendrerit eget eros non, commodo facilisis tellus. Nulla facilisis auctor augue id pretium. Quisque consectetur ipsum purus, eget ultrices nunc ornare in.
            </div>
          </div>
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
