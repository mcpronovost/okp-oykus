import UnderConstructionView from "@/views/error/UnderConstruction";

export const routesGameForum = [
  ...["en/g", "g"].map((r) => ({
    path: r,
    element: <UnderConstructionView />,
  })),
];
