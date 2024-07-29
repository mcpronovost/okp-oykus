import { Buffer } from "buffer";

export const api = "http://127.0.0.1/api";

export function getHeaders(rat = null) {
  const headers = {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/json;charset=UTF-8",
  };
  if (rat) {
    headers["Authorization"] = `Rat ${rat}`;
    headers["Agent"] = `Rat ${Buffer.from(window.navigator.userAgent).toString(
      "base64"
    )}`;
  }
  return headers;
}
