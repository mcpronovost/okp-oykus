import { createBrowserRouter } from "react-router-dom";
import CoreView from "@/Core";
import HomeView from "@/views/Home";
import { routesAuth } from "./routesAuth";
import { routesGameForum } from "./routesGameForum";
import DevblogView from "@/views/Devblog";
import Error404View from "@/views/error/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CoreView />,
    errorElement: <Error404View />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "en",
        element: <HomeView />
      },
      ...routesAuth,
      ...["en/devblog", "devblog"].map((r) => ({
        path: r,
        element: <DevblogView />
      })),
      ...routesGameForum
    ]
  },
]);
