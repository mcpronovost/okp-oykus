import type { Lang } from "@/types/i18n.types";
import { okpStore } from "./utils";

export const lang = okpStore<Lang>("web-lang", "en");
export const sideleftOpenStore = okpStore<boolean>("web-sideleftOpen", false);