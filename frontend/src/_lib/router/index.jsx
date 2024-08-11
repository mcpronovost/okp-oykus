import { createBrowserRouter } from "react-router-dom";
import CoreView from "@/Core";
import HomeView from "@/views/Home";
import { routesAuth } from "./routesAuth";
import { routesGameForum } from "./routesGameForum";
import DevblogView from "@/views/Devblog";
import FaqView from "@/views/Faq";
import ContactView from "@/views/Contact";
import CynostsView from "@/views/Cynosts";
import CommunityView from "@/views/Community";
import AchievementsView from "@/views/Achievements";
import RankingsView from "@/views/Rankings";
import MarketView from "@/views/Market";
import SettingsView from "@/views/Settings";
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
      ...["en/faq", "faq"].map((r) => ({
        path: r,
        element: <FaqView />
      })),
      ...["en/contact", "contact"].map((r) => ({
        path: r,
        element: <ContactView />
      })),
      ...["en/cynosts", "cynosts"].map((r) => ({
        path: r,
        element: <CynostsView />
      })),
      ...["en/community", "communaute"].map((r) => ({
        path: r,
        element: <CommunityView />
      })),
      ...["en/achievements", "succes"].map((r) => ({
        path: r,
        element: <AchievementsView />
      })),
      ...["en/rankings", "classements"].map((r) => ({
        path: r,
        element: <RankingsView />
      })),
      ...["en/market", "marche"].map((r) => ({
        path: r,
        element: <MarketView />
      })),
      ...["en/settings", "parametres"].map((r) => ({
        path: r,
        element: <SettingsView />
      })),
      ...routesGameForum
    ]
  },
]);
