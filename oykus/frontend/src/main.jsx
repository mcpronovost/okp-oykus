import "@/assets/styles/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import OkpProviders from "@/components/Providers.jsx";

function Root() {
  return (
    <StrictMode>
      <OkpProviders>
        <App />
      </OkpProviders>
    </StrictMode>
  );
}

createRoot(document.getElementById("okp")).render(<Root />);
