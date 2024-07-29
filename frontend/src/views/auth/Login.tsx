import type { ReactNode } from "react";
import type { okpMeta } from "@/_lib/router/types";
import { useContext, useState } from "react";
import { Buffer } from "buffer";
import RouterContext from "@/_lib/router";
import StoreContext from "@/_lib/store";
import { api, getHeaders } from "@/_lib/api";
import { getTrans } from "@/_lib/i18n";

const t = getTrans();

export const metaLogin: okpMeta = {
  title: t("Login"),
};

export default function LoginView(): ReactNode {
  const { goRoute } = useContext(RouterContext);
  const { user, setUser } = useContext(StoreContext);

  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
    agent: Buffer.from(window.navigator.userAgent).toString("base64"),
  });

  function handleUsernameChange(e) {
    setFormLogin({
      ...formLogin,
      username: e.target.value,
    });
  }

  function handlePasswordChange(e) {
    setFormLogin({
      ...formLogin,
      password: e.target.value,
    });
  }

  async function doLogin(e) {
    e.preventDefault();
    try {
      const post = await fetch(`${api}/auth/login/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(formLogin),
      });
      if (!post.ok) {
        console.log("error");
      }
      const response = await post.json();
      setUser({
        username: response.username,
        rat: response.rat
      });
      goRoute(t("/"));
    } catch (e) {
      console.log("error : ", e);
    }
  }

  return (
    <>
      <h1>{t("Login")}</h1>
      {!user && (<form onSubmit={doLogin}>
        <input
          type="text"
          value={formLogin.username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          value={formLogin.password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>)}
    </>
  );
}
