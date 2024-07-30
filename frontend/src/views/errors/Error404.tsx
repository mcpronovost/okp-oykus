import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { useContext } from "react";
import RouterContext from "@/_lib/router";
import StoreContext from "@/_lib/store";

export const metaError404: okpMeta = {
  title: "Page Not Found"
}

export default function Error404View (): ReactNode {
  const { goRoute } = useContext(RouterContext);
  const { user, setUser } = useContext(StoreContext);
  
  function doClick () {
    goRoute("/");
  }

  return (
    <>
      <section className="okp-container">
        <h1>Error 404</h1>
        <button onClick={doClick}>retour home</button>
      </section>
    </>
  );
};
