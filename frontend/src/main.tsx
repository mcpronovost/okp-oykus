import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/css/main.scss";
import App from "./App.tsx";

createRoot(document.getElementById("okp")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
