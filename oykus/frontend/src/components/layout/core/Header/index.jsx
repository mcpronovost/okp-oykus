import { ConfigProvider, Layout, theme } from "antd";
import { OkpLink } from "@/components/ui";
import imgLogo from "@/assets/img/logo-48.png";
import OkpHeaderMenu from "./Menu";
import OkpHeaderNotifications from "./Notifications";
import OkpHeaderUser from "./User";

const { useToken } = theme;

export default function OkpHeader() {
  const { Header } = Layout;
  const { token } = useToken();

  return (
    <ConfigProvider theme={{
      components: {
        Menu: {
          itemBg: token.Layout.headerBg,
          itemHeight: 64,
          iconSize: 14,
        },
      },
    }}>
      <Header
        id="okp-core-header"
        theme="light"
      >
        <div id="okp-core-header-brand">
          <OkpLink href="/" id="okp-core-header-brand-link">
            <img src={imgLogo} alt="logo" width={48} height={48} id="okp-core-header-brand-logo" />
            <span id="okp-core-header-brand-title">Oykus</span>
          </OkpLink>
        </div>
        <OkpHeaderMenu />
        <div id="okp-core-header-spacer"></div>
        <OkpHeaderNotifications />
        <OkpHeaderUser />
      </Header>
    </ConfigProvider>
  );
}
