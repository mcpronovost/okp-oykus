import { createBrowserRouter } from "react-router-dom";
import CoreView from "@/Core";
import HomeView from "@/views/Home";
import LoginView from "@/views/auth/Login";
import LogoutView from "@/views/auth/Logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CoreView />,
    children: [
      {
        index: true,
        element: <HomeView />
      },
      ...["/en/login", "/connexion"].map((r) => ({
        path: r,
        element: <LoginView />
      })),
      ...["/en/logout", "/deconnexion"].map((r) => ({
        path: r,
        element: <LogoutView />
      })),
    ]
  },
]);
