import LoginView from "@/views/auth/Login";
import LogoutView from "@/views/auth/Logout";

export const routesAuth = [
  ...["en/login", "connexion"].map((r) => ({
    path: r,
    element: <LoginView />,
  })),
  ...["en/logout", "deconnexion"].map((r) => ({
    path: r,
    element: <LogoutView />,
  }))
];
