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
