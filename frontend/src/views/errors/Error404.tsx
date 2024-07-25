import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";

export const metaError404: okpMeta = {
  title: "Page Not Found"
}

export default function Error404View (): ReactNode {
  return (
    <>
      <h1>Error 404</h1>
    </>
  );
};
