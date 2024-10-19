import { getStoreItem } from "@/_lib/store";

export const api = "http://127.0.0.1/api";

export function getHeaders() {
  const headers = {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const user = getStoreItem("user");
  if (user && user.rat) {
    headers["Authorization"] = `Rat ${user.rat}`;
  }
  return headers;
}

export async function getPing(user) {
  if (!user) return false;
  const f = await fetch(`${api}/ping/`, {headers: getHeaders(user.rat)});
  if (f.ok) {
    const r = await f.json();
    if (r.auth) return r.user;
  }
  return false;
}
