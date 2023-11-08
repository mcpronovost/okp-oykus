import { useContext, useState } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import CoreLayout from "@/components/core/Layout";
import CommonHeader from "@/components/common/Header";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen, setStoreSidebarOpen } = useContext(StoreContext);

  document.documentElement.style.setProperty(
    "--vh", `${window.innerHeight * 0.01}px`
  );

  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
      "--vh", `${window.innerHeight * 0.01}px`
    );
  });

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col">
          <CommonHeader title={t("Home")} />
          <div style={{ backgroundColor: "var(--okp-core)", borderRadius: "6px", padding: "32px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quis urna sed mollis.<br /><br />
            
            Fusce lobortis feugiat tellus eget elementum. Proin sagittis ullamcorper ipsum non tincidunt. Vivamus et risus turpis. Curabitur hendrerit nisl quis neque sodales ultricies. Morbi lacinia elit facilisis mauris volutpat malesuada. Nulla sit amet dictum turpis. Nunc urna ante, hendrerit eget eros non, commodo facilisis tellus. Nulla facilisis auctor augue id pretium. Quisque consectetur ipsum purus, eget ultrices nunc ornare in.<br /><br />

            <div>
              <button type="button" onClick={() => { setStoreSidebarOpen(!sidebarOpen) }}>Mon bouton</button>
            </div><br />

            Liliput id lacus ex. Duis id lacinia massa. Integer et nibh et felis ultrices consectetur. Nunc non nunc porta, posuere risus non, maximus purus. Vivamus malesuada consequat erat, eget mollis sem finibus in. Cras tempus pulvinar porttitor. Aenean ornare ornare dolor, non suscipit quam porttitor at. Fusce et pharetra ipsum. Morbi condimentum tempus odio, nec ultricies magna pharetra ac. Nullam lobortis mi ac erat sollicitudin iaculis. Cras laoreet pellentesque neque at posuere. Nullam in facilisis lectus. Nam congue sapien a ante placerat, nec vulputate nulla facilisis. Proin ut turpis quis justo lacinia tincidunt. Donec et justo odio. Nullam ornare erat vitae porta vulputate.<br /><br />

            <div>
              <div>{ JSON.stringify(sidebarOpen) }</div>
            </div><br />

            Integer id lacus ex. Duis id lacinia massa. Integer et nibh et felis ultrices consectetur. Nunc non nunc porta, posuere risus non, maximus purus. Vivamus malesuada consequat erat, eget mollis sem finibus in. Cras tempus pulvinar porttitor. Aenean ornare ornare dolor, non suscipit quam porttitor at. Fusce et pharetra ipsum. Morbi condimentum tempus odio, nec ultricies magna pharetra ac. Nullam lobortis mi ac erat sollicitudin iaculis. Cras laoreet pellentesque neque at posuere. Nullam in facilisis lectus. Nam congue sapien a ante placerat, nec vulputate nulla facilisis. Proin ut turpis quis justo lacinia tincidunt. Donec et justo odio. Nullam ornare erat vitae porta vulputate.
          </div>
        </div>
      </div>
    </div>
  )
};

const HomeView = () => {
  return (
    <CoreLayout>
      <Content />
    </CoreLayout>
  )
};

export default HomeView;
