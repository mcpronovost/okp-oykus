import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    toasts: [] as Record<string, string>[],
};

const toasterSlice = createSlice({
    name: "toaster",
    initialState: INITIAL_STATE,
    reducers: {
        addToast: (state, action) => {
            state.toasts.push(action.payload);
        },
    },
});

export const toasterActions = toasterSlice.actions;

export default toasterSlice;
