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
          colorBgBase: "#212121",
          colorTextBase: "#A7A8AA",
          colorLink: "#d3b017",
          colorPrimary: "#d3b017",
          colorSuccess: "#338a36",
          colorInfo: "#d3b017",
          colorWarning: "#d3b017",
          colorError: "#af3333",
          fontFamily: "'Roboto Condensed', system-ui, Avenir, Helvetica, Arial, sans-serif",
          fontSize: 14,

          // MapToken
          colorBgContainer: "#191919",  // card
          colorBgElevated: "#121212",  // submenu
          colorBgLayout: "#171717",  // bg
          colorBgSpotlight: "#121212",  // tooltip
          colorBorder: "#3d3d3d",
          colorBorderSecondary: "#1f1f1f",

          // Alias
          boxShadow: "none",
          boxShadowSecondary: "none",
          boxShadowTertiary: "none",
          colorFill: "#1c1c1c",
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
          },
          Input: {
            activeShadow: "none",
            errorActiveShadow: "none",
            warningActiveShadow: "none",
          },
          Layout: {
            headerBg: "#121212",
            headerHeight: 64,
            headerPadding: 0,
          },
          Menu: {
            activeBarBorderWidth: 0,
            collapsedIconSize: 20,
            itemActiveBg: "#1f1f1f",
            itemSelectedBg: "#1f1f1f",
          }
        },
      }}
    >
      <Suspense fallback={<OkpLoading />}>
        {children}
      </Suspense>
    </ConfigProvider>
  );
}