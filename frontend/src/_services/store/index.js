import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/common";
import toasterSlice from "./slices/toaster";

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
        toaster: toasterSlice.reducer,
    },
});

export default store;
