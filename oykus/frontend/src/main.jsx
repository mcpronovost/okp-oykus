import "@/assets/styles/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import OkpProviders from "@/components/Providers.jsx";

function Root() {
  const pathname = window.location.pathname;
  if (!pathname.endsWith("/")) {
    const newPath = `${pathname}/${window.location.search}`;
    window.location.href = newPath;
  }

  return (
    <StrictMode>
      <OkpProviders>
        <App />
      </OkpProviders>
    </StrictMode>
  );
}

createRoot(document.getElementById("okp")).render(<Root />);
