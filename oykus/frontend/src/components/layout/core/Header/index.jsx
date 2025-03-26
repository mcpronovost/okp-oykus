import { useMemo } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import { useAuth } from "@/services/auth";
import { OkpLink } from "@/components/ui";
import imgLogo from "@/assets/img/logo-48.png";
import OkpHeaderMenu from "./Menu";
import OkpHeaderNotifications from "./Notifications";
import OkpHeaderUser from "./User";
import OkpHeaderLoginSignup from "./LoginSignup";

const { useToken } = theme;

export default function OkpHeader() {
  const { Header } = Layout;
  const { token } = useToken();
  const { user } = useAuth();

  const headerColorWithOpacity = useMemo(() => {
    return `rgba(${parseInt(token.Layout.headerColor.slice(1,3), 16)}, ${parseInt(token.Layout.headerColor.slice(3,5), 16)}, ${parseInt(token.Layout.headerColor.slice(5,7), 16)}, 0.5)`;
  }, [token.Layout.headerColor]);

  return (
    <ConfigProvider theme={{
      components: {
        Menu: {
          itemBg: token.Layout.headerBg,
          itemColor: token.Layout.headerColor,
          itemDisabledColor: headerColorWithOpacity,
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
        {user ? (
          <>
            <OkpHeaderNotifications />
            <OkpHeaderUser />
          </>
        ) : (
          <OkpHeaderLoginSignup />
        )}
      </Header>
    </ConfigProvider>
  );
}
