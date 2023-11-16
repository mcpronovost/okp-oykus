import LoginView from "@/pages/Auth/Login";
import LogoutView from "@/pages/Auth/Logout";

export const authRoutes = [
  {
    uri: "/auth/login",
    view: LoginView,
    meta: {
      title: "Login",
    }
  },
  {
    uri: "/auth/logout",
    view: LogoutView,
    meta: {
      title: "Logout",
    }
  }
];
