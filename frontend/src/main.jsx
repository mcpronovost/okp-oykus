import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/_lib/router";
import Providers from "@/components/Providers";
import "@/_assets/style/main.scss";

createRoot(document.getElementById("okp")).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
