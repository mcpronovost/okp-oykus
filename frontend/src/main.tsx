import React from "react";
import ReactDOM from "react-dom/client";
import "@/_assets/styles/core.scss";
import Providers from "@/components/Providers";
import AppView from "@/App.tsx";

ReactDOM.createRoot(document.getElementById("okp")!).render(
  <React.StrictMode>
    <Providers>
      <AppView />
    </Providers>
  </React.StrictMode>
);
