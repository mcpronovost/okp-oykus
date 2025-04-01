import { OkpAuthGamesLayout } from "@/components/layout";
import OkpAuthGamesEditGeneral from "@/components/auth/games/forms/EditGeneral";

export default function OkpAuthGamesEdit({ data }) {
  return (
    <OkpAuthGamesLayout data={data} activeItem="edit">
      <OkpAuthGamesEditGeneral game={data.game} />
    </OkpAuthGamesLayout>
  );
}
