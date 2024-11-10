import type { User } from "@/_libs/types/auth.types";
import type { Game, Character } from "@/_libs/types/games.types";
import OkpCore from "@/components/core/Core";

interface Props {
  user?: User;
  core?: {
    user?: User;
    characters?: Character[];
    games?: Game[];
  };
}

export default function OkpHomeView ({ user, core }: Props) {
  return (
    <OkpCore user={user} core={core}>
      <h1>Hello World!</h1>
    </OkpCore>
  );
}
