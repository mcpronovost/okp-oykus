import React from "react";
import ReactDOM from "react-dom/client";
import AppView from "@/App.jsx";
import "@/assets/styles/core.scss";
import "@/assets/scripts/core.js";

const app = document.getElementById("okp");
const root = ReactDOM.createRoot(app);

root.render(
  <React.StrictMode>
    <AppView />
  </React.StrictMode>
);
