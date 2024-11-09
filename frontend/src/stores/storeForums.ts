import { okpStore } from "./utils";

export const topicsPerPage = okpStore<number>("forums-topicsPerPage", 2);
export const messagesPerPage = okpStore<number>("forums-messagesPerPage", 2);
