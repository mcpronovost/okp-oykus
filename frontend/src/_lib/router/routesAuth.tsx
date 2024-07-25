import type { okpRoute } from "./types";
import LoginView, { metaLogin } from "@/views/auth/Login";

export const routesAuth: okpRoute[] = [
  {
    uri: "/login",
    view: LoginView,
    meta: metaLogin,
    hidelayout: true,
  },
];
