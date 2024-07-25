import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { getTrans } from "@/_lib/i18n";

const t = getTrans();

export const metaLogin: okpMeta = {
  title: t("Login"),
};

export default function LoginView(): ReactNode {
  return (
    <>
      <h1>{t("Login")}</h1>
    </>
  );
}
