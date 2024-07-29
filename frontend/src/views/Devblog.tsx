import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { getTrans } from "@/_lib/i18n";

const t = getTrans();

export const metaDevblog: okpMeta = {
  title: t("Devblog"),
};

export default function DevblogView(): ReactNode {
  return (
    <>
      <div className="okp-container">
        <h1>{t("Devblog")}</h1>
      </div>
    </>
  );
}
