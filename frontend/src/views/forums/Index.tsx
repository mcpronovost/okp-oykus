import type { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";
import { getTrans } from "@/_lib/i18n";
import RouterContext from "@/_lib/router";
import StoreContext from "@/_lib/store";
import { api, getHeaders } from "@/_lib/api";

const t = getTrans();

export default function ForumIndexView(): ReactNode {
  const { user } = useContext(StoreContext);
  const { route, setMeta } = useContext(RouterContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  function getGameSlug () {
    try {
      const splitted = route.regex.exec(window.location.pathname)[0].split("/");
      return splitted[2];
    } catch {
      return null;
    }
  }

  async function getIndex(slug) {
    setIsLoading(true);
    setHasError(null);
    try {
      const req = await fetch(`${api}/forum/${slug}/index/`, {
        headers: getHeaders(user.rat),
      });
      if (!req.ok) {
        throw req.status;
      }
      const response = await req.json();
      console.log(response);
      setMeta(response.game.name);
    } catch (e) {
      setHasError(`Error : ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const gameSlug = getGameSlug();
    getIndex(gameSlug);
  }, []);

  return (
    <>
      <section className="okp-forum-index">
        {(!hasError && isLoading) && (
          <div className="okp-container">
            <div className="okp-loading">loading...</div>
          </div>
        )}
        {hasError && (
          <div>{hasError}</div>
        )}
      </section>
    </>
  );
}
