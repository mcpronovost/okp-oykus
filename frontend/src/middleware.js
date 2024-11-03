import { parse } from "cookie";

export function onRequest({ locals, request }, next) {
  const API_URL = import.meta.env.API_URL || process.env.API_URL;
  const API_PORT = import.meta.env.API_PORT || process.env.API_PORT;
  const API_ENV = import.meta.env.NODE_ENV || process.env.NODE_ENV;

  const API_PROTOCOL = API_ENV !== "development" ? "https" : "http";

  if (
    API_URL !== undefined &&
    API_URL !== "" &&
    API_PORT !== undefined &&
    API_PORT !== ""
  ) {
    locals.api = `${API_PROTOCOL}://${API_URL}:${API_PORT}/api`;
  } else {
    locals.api = "http://localhost:8010/api";
  }

  locals.uri = new URL(request.url).pathname;
  locals.protocol = API_PROTOCOL;

  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  locals.lang = cookies["okp-web-lang"] || "fr";

  // return a Response or the result of calling `next()`
  return next();
}
