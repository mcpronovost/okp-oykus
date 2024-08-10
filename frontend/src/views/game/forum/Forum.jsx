import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { getTrans } from "@/_lib/i18n";
import { api, getHeaders } from "@/_lib/api";

export async function loader({ params }) {
  const t = getTrans();
  try {
    const req = await fetch(`${api}/forum/${params.slug}/index/`, {
      headers: getHeaders(),
    });
    if (!req.ok) {
      throw req.status;
    }
    const response = await req.json();
    return {
      data: response
    };
  } catch (e) {
    if (e === 401) throw new Response(t("Unauthorized"), { status: 401 });
    else throw new Response(t("NotFound"), { status: 404 });
  }
}

export default function ForumView() {
  const { data } = useLoaderData();

  const setGameStyle = () => {
    const tag = document.head.querySelector("#okp-game-stylesheet");
    if (!!tag && tag.dataset["game"] != data.game.slug) tag.remove();
    if (!tag) {
      if (data.game.slug == "rhansidor") {
        document.head.insertAdjacentHTML("beforeend", `<style id="okp-game-stylesheet" data-game="${data.game.slug}">
          :root {
            --okp-primary: #336447;
            --okp-lighten: #221b20;
            --okp-light: #1a181b;
            --okp-mid: #2a1f27;
            --okp-dark: #100f11;
            --okp-darken: #080709;
            --okp-text: #b6afb6;
            --okp-text-low: #715c71;
          }
        </style>`)
      }
    }
  };

  useEffect(() => {
    setGameStyle();
  }, [data]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", padding: "120px 0" }}>{data.game.name}</h1>
        <div className="okp-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
