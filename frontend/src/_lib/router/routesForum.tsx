import type { okpRoute } from "./types";
import ForumIndexView, { metaForumIndex } from "@/views/forums/Index";

export const routesForum: okpRoute[] = [
  {
    uri: "/g/[slug]",
    regex: /^\/g\/[A-Za-z0-9_-]+$/,
    view: ForumIndexView,
    meta: metaForumIndex,
    needauth: true,
  },
  {
    uri: "/g/[slug]/c[category_id]-[category_slug]",
    regex: /^\/g\/[A-Za-z0-9_-]+\/c[0-9]+-[A-Za-z0-9_-]+$/,
    view: ForumIndexView,
    meta: metaForumIndex,
    needauth: true,
  },
];
