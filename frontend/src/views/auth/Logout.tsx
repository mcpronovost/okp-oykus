import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { useContext, useState } from "react";
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

  async function doLogout(e) {
    e.preventDefault();
    try {
      const post = await fetch(`${api}/auth/logout/`, {
        method: "POST",
        headers: getHeaders(user.rat),
        body: null
      });
      if (!post.ok) {
        return console.log("error");
      }
      const response = await post.json();
      delUser();
      goRoute(t("/"));
    } catch (e) {
      console.log("error : ", e);
    }
  }

  return (
    <>
      <h1>{t("Logout")}</h1>
      {user && (<form onSubmit={doLogout}>
        <button type="submit">Submit</button>
      </form>)}
    </>
  );
}
