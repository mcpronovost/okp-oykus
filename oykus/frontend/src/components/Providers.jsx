import { ConfigProvider, theme as antdTheme } from "antd";
import enGB from "antd/locale/en_GB";
import frCA from "antd/locale/fr_CA";
import RouterProvider from "@/services/router/context";
import I18nProvider from "@/services/i18n/context";

export default function OkpProviders({ children, theme, lang }) {
  return (
    <RouterProvider>
      <I18nProvider>
        <ConfigProvider
          locale={lang === "en" ? enGB : frCA}
          theme={{
            algorithm: antdTheme.darkAlgorithm,
            token: {
              // SeedToken
              borderRadius: 4,
              colorBgBase: "#212121",
              colorPrimary: theme?.primary,

              // AliasToken
              boxShadow: "none",
              boxShadowSecondary: "none",
              boxShadowTertiary: "none",
            },
            components: {
              Layout: {
                headerBg: theme?.layout_header_bg || "#435259",
                siderBg: theme?.layout_sider_bg || "#dbe0e2",
                triggerBg: theme?.layout_trigger_bg || "#435259",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </I18nProvider>
    </RouterProvider>
  );
}
