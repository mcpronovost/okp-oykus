import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { getTrans } from "@/_lib/i18n";

const t = getTrans();

export const metaHome: okpMeta = {
  title: t("Home"),
};

export default function HomeView(): ReactNode {
  return (
    <>
      <h1>{t("Home")}</h1>
    </>
  );
}
