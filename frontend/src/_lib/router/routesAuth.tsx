import type { okpRoute } from "./types";
import LoginView, { metaLogin } from "@/views/auth/Login";
import LogoutView, { metaLogout } from "@/views/auth/Logout";

export const routesAuth: okpRoute[] = [
  {
    uri: "/login",
    view: LoginView,
    meta: metaLogin,
    hidelayout: true,
  },
  {
    uri: "/logout",
    view: LogoutView,
    meta: metaLogout,
    hidelayout: true,
  },
];
