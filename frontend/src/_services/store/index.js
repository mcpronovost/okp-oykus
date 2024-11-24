import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/common";

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
    },
});

export default store;
