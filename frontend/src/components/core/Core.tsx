import type { User } from "@/_libs/types/auth.types";
import type { Game, Character } from "@/_libs/types/games.types";
import React from "react";
import SimpleBarReact from "simplebar-react";
import OkpProviders from "@/components/common/Providers";
import OkpCoreHead from "@/components/core/CoreHead";
import OkpCoreLeft from "@/components/core/CoreLeft";
import OkpCoreRight from "@/components/core/CoreRight";

interface Props {
  children: React.ReactNode;
  slug?: string;
  user?: User;
  core?: {
    user?: User;
    characters?: Character[];
    games?: Game[];
  };
}

export default function OkpCore ({ children, slug, user, core }: Props) {
  return (
    <OkpProviders>
      <OkpCoreHead user={user} />
      <div id="okp-core-body">
        <OkpCoreLeft slug={slug} user={user} />
        <main id="okp-core-main">
          <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
            {children}
          </SimpleBarReact>
        </main>
        <OkpCoreRight slug={slug} user={user} characters={core?.characters} games={core?.games} />
      </div>
    </OkpProviders>
  );
}
