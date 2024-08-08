import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";

export default function LoginView() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StoreContext);
  const t = getTrans();

  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
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
      navigate(-1);
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
