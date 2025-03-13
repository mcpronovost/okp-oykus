import "@radix-ui/themes/styles.css";
import "@/assets/styles/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import OkpProviders from "@/components/Providers.jsx";

createRoot(document.getElementById("okp")).render(
  <StrictMode>
    <OkpProviders>
      <App />
    </OkpProviders>
  </StrictMode>
);
