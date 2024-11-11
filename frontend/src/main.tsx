import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "simplebar-react/dist/simplebar.min.css";
import "@/_assets/css/main.scss";
import Providers from "@/components/Providers";
import App from "@/App";

createRoot(document.getElementById("okp")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
