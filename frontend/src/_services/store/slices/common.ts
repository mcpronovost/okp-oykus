import type { LangType } from "@/services/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { LANG_DEFAULT, LANGUAGES, ROUTES } from "@/services/utils/constants";
import { findRoute } from "@/services/router";

const INITIAL_STATE = {
    lang: (window.document.documentElement.lang as LangType) || LANG_DEFAULT,
};

const commonSlice = createSlice({
    name: "common",
    initialState: INITIAL_STATE,
    reducers: {
        setLang: (state, action) => {
            const newLang = action.payload;
            if (!LANGUAGES.includes(newLang)) return;

            const uri =
                window.location.pathname
                    .split("/")
                    .slice(2)
                    .join("/")
                    .replace(/^\/+|\/+$/g, "") || "";
            const route = findRoute(uri, ROUTES, state.lang);
            const redirectPath = route
                ? `/${newLang}/${route[1].paths[newLang as LangType]}`
                : `/${newLang}`;

            state.lang = newLang;
            window.location.href = redirectPath;
        },
    },
});

export const commonActions = commonSlice.actions;

export default commonSlice;
