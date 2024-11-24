import { VITE_PROTOCOL, VITE_API, VITE_API_VERSION } from "astro:env/client";

export const API = {
    URL: `${VITE_PROTOCOL}://${VITE_API}`,
    BACKEND: `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_BACKEND}`,
    STORAGE: {
        RAT: "okp-oykus-rat",
        USER: "okp-oykus-user",
    },
    VERSION: VITE_API_VERSION,
} as const;
