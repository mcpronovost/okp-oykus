import "@ant-design/v5-patch-for-react-19";
import "@/assets/styles/main.scss";
import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import { loadInitData, loadInitTheme } from "@/utils";
import { getLangAndEnforceTrailingSlash } from "@/services/router/utils";
import App from "./App.jsx";
import OkpProviders from "@/components/Providers.jsx";

function Root() {
  const lang = useRef(getLangAndEnforceTrailingSlash());
  const initDataRef = useRef(loadInitData());
  const initThemeRef = useRef(loadInitTheme());

  return (
    <StrictMode>
      <OkpProviders lang={lang.current} theme={initThemeRef.current}>
        <App data={initDataRef.current} />
      </OkpProviders>
    </StrictMode>
  );
}

const okpRoot = document.getElementById("okp");
if (okpRoot) {
  createRoot(okpRoot).render(<Root />);
}
