import os from "os";

export function onRequest (context, next) {

    context.locals.api = `http://${import.meta.env.BACKEND_IP}:8000`;

    return next();
};
