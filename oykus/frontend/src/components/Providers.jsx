import { ConfigProvider, theme as antdTheme } from "antd";
import en from "antd/locale/en_GB";
import fr from "antd/locale/fr_CA";
import { RouterProvider } from "@/services/router";
import { TranslationProvider } from "@/services/translation";

export default function OkpProviders({ children, theme, lang, path }) {
  return (
    <RouterProvider lang={lang} routePath={path}>
      <TranslationProvider lang={lang}>
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
              colorBgContainer: "#191919",
              colorBgSpotlight: "#121212",
              colorBorder: "#3d3d3d",
              colorBorderSecondary: "#1f1f1f",

              // Alias
              boxShadow: "none",
              boxShadowSecondary: "none",
              boxShadowTertiary: "none",
            },
            components: {
              Card: {
                lineWidth: 0,
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
          {children}
        </ConfigProvider>
      </TranslationProvider>
    </RouterProvider>
  );
}
