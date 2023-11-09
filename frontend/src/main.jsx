import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@/plugins/router";
import { StoreProvider } from "@/plugins/store";
import AppView from "@/App.jsx";
import "@/assets/styles/core.scss";
import "@/assets/scripts/core.js";

const app = document.getElementById("okp");
const root = ReactDOM.createRoot(app);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider>
        <AppView />
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);
