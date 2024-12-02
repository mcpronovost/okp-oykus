import type { AppDispatch, RootState } from "@/services/utils/types";
import Providers from "@/components/react/Providers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleAlert, CircleCheck, X } from "lucide-react";
import { toasterActions } from "@/services/store/slices/toaster";

export function Toaster() {
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useSelector((state: RootState) => state.toaster.toasts);

    const [closingToasts, setClosingToasts] = useState<Set<string>>(new Set());

    const handleCloseToast = (id: string) => {
        setClosingToasts(prev => new Set(prev).add(id));
        setTimeout(() => {
            dispatch(toasterActions.deleteToast(id));
        }, 200);
    };

    useEffect(() => {
        toasts.filter(toast => toast.duration).forEach(toast => {
            setTimeout(() => {
                handleCloseToast(toast.id);
            }, toast.duration);
        });
    }, [toasts]);

    return (
        <section className="okp-toaster">
            {toasts.map((toast) => (
                <article key={toast.id} className={`okp-toaster-toast ${toast.status ? `okp-${toast.status}` : ""} ${closingToasts.has(toast.id) ? "okp-closing" : ""}`}>
                    {toast.title && (
                        <header className="okp-toaster-toast-header">
                            {toast.status === "success" && <CircleCheck size={16} />}
                            {toast.status === "error" && <CircleAlert size={16} />}
                            <span className="okp-toaster-toast-title">{toast.title}</span>
                        </header>
                    )}
                    {toast.content && (
                        <div className="okp-toaster-toast-content">
                            {!toast.title && toast.status === "success" && <CircleCheck size={16} />}
                            {!toast.title && toast.status === "error" && <CircleAlert size={16} />}
                            <p>{toast.content}</p>
                        </div>
                    )}
                    <footer>
                        <button className="okp-toaster-toast-close" onClick={() => handleCloseToast(toast.id)}>
                            <X size={12} />
                        </button>
                    </footer>
                </article>
            ))}
        </section>
    );
}

export default function OkpToaster() {
    return (
        <Providers>
            <Toaster />
        </Providers>
    );
}