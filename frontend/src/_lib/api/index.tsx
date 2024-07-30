import { Buffer } from "buffer";

export const api = "http://127.0.0.1/api";

export function getHeaders(rat = null) {
  const headers = {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/json;charset=UTF-8",
  };
  if (rat) {
    headers["Authorization"] = `Rat ${rat}`;
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
