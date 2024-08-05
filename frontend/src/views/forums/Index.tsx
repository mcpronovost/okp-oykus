import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { useContext, useEffect } from "react";
import { getTrans } from "@/_lib/i18n";
import RouterContext from "@/_lib/router";

const t = getTrans();

export const metaForumIndex: okpMeta = {
  title: t("Forum"),
};

export default function ForumIndexView(): ReactNode {
  const { route } = useContext(RouterContext);

  useEffect(() => {
    console.log(route);
  }, []);

  return (
    <>
      <div className="okp-container">
        <h1>{t("Forum")}</h1>
      </div>
    </>
  );
}
