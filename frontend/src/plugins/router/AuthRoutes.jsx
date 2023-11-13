import LoginView from "@/pages/Auth/Login";

export const authRoutes = [
  {
    uri: "/auth/login",
    view: LoginView,
    meta: {
      title: "Login",
    }
  }
];
