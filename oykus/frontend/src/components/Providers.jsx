import { ConfigProvider, theme as antdTheme } from "antd";
import en from "antd/locale/en_GB";
import fr from "antd/locale/fr_CA";
import { RouterProvider } from "@/services/router";
import { TranslationProvider } from "@/services/translation";

export default function OkpProviders({ children, theme, lang }) {
  return (
    <RouterProvider lang={lang}>
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
              },
              Menu: {
                activeBarBorderWidth: 0,
                collapsedIconSize: 20,
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
