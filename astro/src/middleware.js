export function onRequest({ locals, request }, next) {
  const API_URL = import.meta.env.API_URL || process.env.API_URL;
  const API_PORT = import.meta.env.API_PORT || process.env.API_PORT;

  if (
    API_URL !== undefined &&
    API_URL !== "" &&
    API_PORT !== undefined &&
    API_PORT !== ""
  ) {
    locals.api = API_URL + ":" + API_PORT;
  } else {
    locals.api = "http://localhost:8010";
  }
  locals.uri = new URL(request.url).pathname;

  // return a Response or the result of calling `next()`
  return next();
}
