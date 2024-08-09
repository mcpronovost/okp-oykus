import { Outlet, useLoaderData } from "react-router-dom";
import { api, getHeaders } from "@/_lib/api";

export async function loader({ params }) {
  if (!params.slug) return;
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
    return;
  }
}

export default function ForumView() {
  const { data } = useLoaderData();

  return (
    <>
      <div className="okp-container">
        <h1 style={{ textAlign: "center", padding: "120px 0" }}>{data.game.name}</h1>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
