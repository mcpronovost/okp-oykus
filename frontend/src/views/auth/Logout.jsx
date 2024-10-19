import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "@/_lib/store";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";

export default function LogoutView() {
  const navigate = useNavigate();
  const { user, delUser } = useContext(StoreContext);
  const t = getTrans();

  async function doLogout() {
    try {
      const post = await fetch(`${api}/auth/logout/`, {
        method: "POST",
        headers: getHeaders(user.rat),
        body: null,
      });
    } finally {
      delUser();
      navigate(t("/"));
    }
  }

  useEffect(() => {
    doLogout();
  }, []);

  return (
    <>
      <h1>{t("Logout")}</h1>
      {user && (
        <div>
          <button onSubmit={doLogout} type="submit">
            Submit
          </button>
        </div>
      )}
    </>
  );
}
