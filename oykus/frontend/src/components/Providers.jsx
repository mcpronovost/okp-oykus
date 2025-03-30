import { Suspense, lazy } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import en from "antd/locale/en_GB";
import fr from "antd/locale/fr_CA";
import { AuthProvider } from "@/services/auth";
import { InitDataProvider } from "@/services/initData";
import { RouterProvider } from "@/services/router";
import { TranslationProvider } from "@/services/translation";
import { OkpLoading } from "@/components/ui";

export default function OkpProviders({ children, theme, lang, path, data }) {
  return (
    <RouterProvider lang={lang} routePath={path}>
      <AuthProvider>
        <TranslationProvider lang={lang}>
          <InitDataProvider data={data}>
            <OkpProvidersContent lang={lang} theme={theme}>
              <Suspense fallback={<OkpLoading />}>
                {children}
              </Suspense>
            </OkpProvidersContent>
          </InitDataProvider>
        </TranslationProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

function OkpProvidersContent({ children, lang, theme }) {
  return (
    <ConfigProvider
      locale={lang === "en" ? en : fr}
      theme={{
        algorithm: antdTheme.lightAlgorithm,
        token: {
          // SeedToken
          borderRadius: 4,
          colorBgBase: theme?.core_bg || "#1c1c1c",
          colorTextBase: theme?.core_fg || "#A7A8AA",
          colorLink: theme?.core_link || "#d3b017",
          colorPrimary: theme?.primary || "#d3b017",
          colorInfo: "#d3b017",
          colorWarning: "#d3b017",
          fontFamily: "'Roboto Condensed', system-ui, Avenir, Helvetica, Arial, sans-serif",
          fontSize: 14,

          // MapToken
          colorBgContainer: theme?.card_bg || "#1f1f1f",  // "#191919",  // card
          colorBgElevated: theme?.core_elevated_bg || "#161616",  // submenu
          colorBgLayout: theme?.core_bg || "#1c1c1c",  //"#171717",  // bg
          colorBgSpotlight: theme?.core_elevated_bg || "#161616",  // tooltip
          colorBorder: theme?.core_border || "#313131",  // form and collapse separator/border
          colorBorderSecondary: theme?.card_separator || "#313131",  // elevated separator
          colorFill: theme?.card_placeholder_bg || "#232323", // "#1c1c1c",  // card mask
          colorTextSecondary: theme?.core_subtle_fg || "#5a5c5f",
          colorTextTertiary: theme?.card_placeholder_fg || "#A7A8AA",

          colorSuccess: "#4ba51f",
          colorSuccessBg: "#24301f",
          // colorSuccessActive: "#000000",
          // colorSuccessBorder: "#000000",
          // colorSuccessText: "#000000",
          // colorSuccessTextActive: "#000000",
          colorError: "#af3333",
          colorErrorBg: "#301f1f",
          // colorErrorActive: "#000000",
          // colorErrorBorder: "#000000",
          // colorErrorText: "#000000",
          // colorErrorTextActive: "#000000",

          // Alias
          boxShadow: "1px 1px 1px 1px rgba(0,0,0,.12)",
          boxShadowSecondary: "0 0 4px rgba(0,0,0,.12)",
          boxShadowTertiary: "0 0 1px 0 rgba(0,0,0,.12)",  // card shadow
          colorTextLightSolid: theme?.core_elevated_fg || "#A7A8AA",
        },
        components: {
          Button: {
            defaultShadow: "none",
            dangerShadow: "none",
            primaryShadow: "none",
            primaryColor: "#000000",
          },
          Card: {
            lineWidth: 0,
            bodyPadding: 12,
          },
          Input: {
            activeShadow: "none",
            errorActiveShadow: "none",
            warningActiveShadow: "none",
          },
          Layout: {
            headerBg: theme?.core_header_bg || "#121212",
            headerColor: theme?.core_header_fg || "#A7A8AA",
            headerHeight: 64,
            headerPadding: 0,
          },
          Menu: {
            activeBarBorderWidth: 0,
            collapsedIconSize: 20,
            itemActiveBg: "#1f1f1f",
            itemSelectedBg: "#1f1f1f",
          },
          Select: {
            activeOutlineColor: "transparent",
            optionSelectedBg: theme?.card_placeholder_bg || "#232323",
            optionSelectedColor: theme?.card_placeholder_fg || "#A7A8AA",
          },
        },
      }}
    >
      <Suspense fallback={<OkpLoading />}>
        <div id="okp-theme" style={{ "--c-primary": theme?.primary || "#d3b017" }}>
          {children}
        </div>
      </Suspense>
    </ConfigProvider>
  );
}