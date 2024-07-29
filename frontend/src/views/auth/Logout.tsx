import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { useContext, useEffect } from "react";
import { Buffer } from "buffer";
import RouterContext from "@/_lib/router";
import StoreContext from "@/_lib/store";
import { api, getHeaders } from "@/_lib/api";
import { getTrans } from "@/_lib/i18n";

const t = getTrans();

export const metaLogout: okpMeta = {
  title: t("Logout"),
};

export default function LogoutView(): ReactNode {
  const { goRoute } = useContext(RouterContext);
  const { user, delUser } = useContext(StoreContext);

  async function doLogout() {
    try {
      const post = await fetch(`${api}/auth/logout/`, {
        method: "POST",
        headers: getHeaders(user.rat),
        body: null
      });
    } finally {
      delUser();
      goRoute(t("/"));
    }
  }

  useEffect(() => {
    doLogout();
  }, []);

  return (
    <>
      <h1>{t("Logout")}</h1>
      {user && (<div>
        <button onSubmit={doLogout} type="submit">Submit</button>
      </div>)}
    </>
  );
}
