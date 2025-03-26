import "@ant-design/v5-patch-for-react-19";
import "@/assets/styles/main.scss";
import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import { loadInitData, loadInitTheme } from "@/utils";
import { getLangPathAndEnforceTrailingSlash } from "@/services/router/utils";
import App from "./App.jsx";
import OkpErrorBoundary from "@/components/ErrorBoundary";
import OkpProviders from "@/components/Providers.jsx";

function Root() {
  const langPath = useRef(getLangPathAndEnforceTrailingSlash());
  const initDataRef = useRef(loadInitData());
  const initThemeRef = useRef(loadInitTheme());

  return (
    <StrictMode>
      <OkpErrorBoundary>
        <OkpProviders
          lang={langPath.current.langCode}
          path={langPath.current.pathPart}
          theme={initThemeRef.current}
          data={initDataRef.current}
        >
          <App
            lang={langPath.current.langCode}
            path={langPath.current.pathPart}
            data={initDataRef.current}
          />
        </OkpProviders>
      </OkpErrorBoundary>
    </StrictMode>
  );
}

const okpRoot = document.getElementById("okp");
if (okpRoot) {
  createRoot(okpRoot).render(<Root />);
}
