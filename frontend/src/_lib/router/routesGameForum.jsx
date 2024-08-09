import StoreContext from "@/_lib/store";
import GameForumView, { loader as getForum } from "@/views/game/forum/Forum";
import GameForumIndexView, { loader as getIndex } from "@/views/game/forum/Index";
import GameForumCategoryView, { loader as getCategory } from "@/views/game/forum/Category";
import GameForumSectionView, { loader as getSection } from "@/views/game/forum/Section";
import GameForumTopicView, { loader as getTopic } from "@/views/game/forum/Topic";
import UnderConstructionView from "@/views/error/UnderConstruction";

export const routesGameForum = [
  ...["en/g", "g"].map((r) => ({
    path: r,
    element: <UnderConstructionView />,
  })),
  ...["en/g/:slug", "g/:slug"].map((r) => ({
    path: r,
    element: <GameForumView />,
    loader: getForum,
    children: [
      {
        index: true,
        element: <GameForumIndexView />,
        loader: getIndex,
      },
      ...[":category", ":category"].map((r) => ({
        path: r,
        element: <GameForumCategoryView />,
        loader: getCategory
      })),
      ...[":category/:section", ":category/:section"].map((r) => ({
        path: r,
        element: <GameForumSectionView />,
        loader: getSection
      })),
      ...[":category/:section/:topic", ":category/:section/:topic"].map((r) => ({
        path: r,
        element: <GameForumTopicView />,
        loader: getTopic
      })),
    ]
  })),
];
