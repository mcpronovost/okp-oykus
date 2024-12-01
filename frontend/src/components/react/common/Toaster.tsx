import type { RootState } from "@/services/utils/types";
import Providers from "@/components/react/Providers";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { getTranslation } from "@/services/i18n";

export function Toaster() {
    const toasts = useSelector((state: RootState) => state.toaster.toasts);
    const lang = useSelector((state: RootState) => state.common.lang);
    const { t } = getTranslation(lang);

    return (
        <section className="okp-toaster">
            <article className="okp-toaster-toast">
                <header>
                    toast
                </header>
                <footer>
                    <button className="okp-toaster-toast-close">
                        <X size={12} />
                    </button>
                </footer>
            </article>
            <article className="okp-toaster-toast okp-success">
                <header>
                    toast success
                </header>
                <footer>
                    <button className="okp-toaster-toast-close">
                        <X size={12} />
                    </button>
                </footer>
            </article>
            <article className="okp-toaster-toast okp-error">
                <header>
                    toast error
                </header>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                    </p>
                </div>
                <footer>
                    <button className="okp-toaster-toast-close">
                        <X size={12} />
                    </button>
                </footer>
            </article>
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