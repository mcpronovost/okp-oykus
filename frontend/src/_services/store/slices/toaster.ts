import type { ToastType } from "@/services/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const getSessionToasts = (): ToastType[] => {
    const saved = sessionStorage.getItem("toasts");
    return saved ? JSON.parse(saved) : [];
};

const INITIAL_STATE = {
    toasts: getSessionToasts() as ToastType[],
};

const toasterSlice = createSlice({
    name: "toaster",
    initialState: INITIAL_STATE,
    reducers: {
        addToast: (state, action) => {
            const newToasts = [...state.toasts, {
                ...action.payload,
                id: crypto.randomUUID(),
            }];
            sessionStorage.setItem("toasts", JSON.stringify(newToasts));
            state.toasts = newToasts;
        },
        deleteToast: (state, action) => {
            const newToasts = state.toasts.filter((toast) => toast.id !== action.payload);
            sessionStorage.setItem("toasts", JSON.stringify(newToasts));
            state.toasts = newToasts;
        },
    },
});

export const toasterActions = toasterSlice.actions;

export default toasterSlice;
