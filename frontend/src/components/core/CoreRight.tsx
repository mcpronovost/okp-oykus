import type { User } from "@/_libs/types/auth.types";
import React from "react";

interface Props {
  user?: User;
}

export default function OkpCoreRight ({ user }: Props) {
  return (
    <aside id="okp-core-right">right</aside>
  );
}
