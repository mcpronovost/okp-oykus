import "@/assets/styles/main.scss";
import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import { getInitData, getInitTheme } from "@/utils";
import { getLang } from "@/services/router/utils";
import App from "./App.jsx";
import OkpProviders from "@/components/Providers.jsx";

function Root() {
  const pathname = window.location.pathname;
  if (!pathname.endsWith("/")) {
    const newPath = `${pathname}/${window.location.search}`;
    window.location.href = newPath;
  }
  const lang = getLang(pathname);
  const initDataRef = useRef(getInitData());
  const initThemeRef = useRef(getInitTheme());

  return (
    <StrictMode>
      <OkpProviders lang={lang} theme={initThemeRef.current}>
        <App data={initDataRef.current} />
      </OkpProviders>
    </StrictMode>
  );
}

createRoot(document.getElementById("okp")).render(<Root />);
