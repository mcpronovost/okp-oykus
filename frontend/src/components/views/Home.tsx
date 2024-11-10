import type { User } from "@/_libs/types/auth.types";
import OkpCore from "@/components/core/Core";

interface Props {
  user?: User;
}

export default function OkpHomeView ({ user }: Props) {
  return (
    <OkpCore user={user}>
      <h1>Hello World!</h1>
    </OkpCore>
  );
}
