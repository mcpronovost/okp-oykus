import type { Game } from "@/_libs/types/games.types";
import React from "react";
import OkpForumCategoryList from "@/components/forums/CategoryList";

interface Props {
  slug?: string;
  uri?: string;
  game?: Game;
}

export default function OkpForumsIndexView ({ slug, uri, game }: Props) {
  return (
    <div className="okp-grid">
      <div className="okp-forum">
        <OkpForumCategoryList slug={slug} />
      </div>
    </div>
  );
}
