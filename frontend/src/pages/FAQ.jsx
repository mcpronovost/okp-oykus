import { getTranslation, getLang } from "@/plugins/i18n";
import OkpLayout from "@/components/core/Layout";
import OkpHeader from "@/components/common/Header";
import OkpAlert from "@/components/common/Alert";
import OkpLoading from "@/components/common/Loading";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <OkpHeader title={t("FAQ")} />
            <div className="okp-core">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quis urna sed mollis.Fusce lobortis feugiat tellus eget elementum. Proin sagittis ullamcorper ipsum non tincidunt. Vivamus et risus turpis. Curabitur hendrerit nisl quis neque sodales ultricies. Morbi lacinia elit facilisis mauris volutpat malesuada. Nulla sit amet dictum turpis. Nunc urna ante, hendrerit eget eros non, commodo facilisis tellus. Nulla facilisis auctor augue id pretium. Quisque consectetur ipsum purus, eget ultrices nunc ornare in.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <OkpAlert />
          </div>
          <div className="col-12">
            <OkpAlert type="error" title="Error" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </div>
          <div className="col-12">
            <OkpAlert type="warning" title="Warning" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </div>
          <div className="col-12">
            <OkpAlert type="success" title="Success" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </div>
          <div className="col-12">
            <OkpAlert type="info" title="Info" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </div>
          <div className="col-12">
            <OkpLoading />
          </div>
        </div>
      </div>
    </>
  )
};

const View = () => {
  return (
    <OkpLayout>
      <Content />
    </OkpLayout>
  )
};

export default View;
