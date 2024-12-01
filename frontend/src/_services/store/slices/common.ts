import type { LangType } from "@/services/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { LANG_DEFAULT, LANGUAGES } from "@/services/utils/constants";
import { findLocaleRoute } from "@/services/router";

const INITIAL_STATE = {
    lang: (window.document.documentElement.lang as LangType) || LANG_DEFAULT,
};

const commonSlice = createSlice({
    name: "common",
    initialState: INITIAL_STATE,
    reducers: {
        setLang: (state, action) => {
            const oldLang = state.lang;
            const newLang = action.payload;
            if (!LANGUAGES.includes(newLang)) return;

            const uri = window.location.pathname.replace(new RegExp(`^/${oldLang}/`), "");
            const route = findLocaleRoute(uri, oldLang, newLang);
            const redirectPath = route ? route : `/${newLang}`;

            state.lang = newLang;
            window.location.href = redirectPath;
        },
    },
});

export const commonActions = commonSlice.actions;

export default commonSlice;
