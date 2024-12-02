export type ToastType = {
    id: string;
    status?: "success" | "error";
    title?: string;
    content?: string;
    duration?: number;
};
