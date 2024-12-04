import type { AppDispatch, RootState } from "@/services/utils/types";
import { API } from "src/_services/utils/constants";
import Providers from "@/components/react/Providers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilLine } from "lucide-react";
import { authApi } from "@/services/api";
import { getTranslation } from "@/services/i18n";
import { getRoute } from "@/services/router";
import { toasterActions } from "@/services/store/slices/toaster";

export function AuthLoginForm() {
    const dispatch = useDispatch<AppDispatch>();
    const lang = useSelector((state: RootState) => state.common.lang);
    const { t } = getTranslation(lang);
    const { r } = getRoute(lang);
    const NAME_MAX_LENGTH = 120;

    const [formPayload, setFormPayload] = useState({
        username: "",
        password: "",
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

    const handleFormUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPayload({
            ...formPayload,
            username: event.target.value,
        });
    };

    const handleFormUsernameKeyUp = () => {
        if (formPayload.username.length > NAME_MAX_LENGTH) {
            setFormPayload({
                ...formPayload,
                username: formPayload.username.slice(0, NAME_MAX_LENGTH),
            });
        }
    };

    const handleFormPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPayload({
            ...formPayload,
            password: event.target.value,
        });
    };

    const handleCancel = () => {
        window.location.href = r("/");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormErrors({});
        setFormLoading(true);
        const result = await authApi.login(formPayload.username.trim(), formPayload.password.trim());
        if (result.status === 200) {
            window.document.cookie = `${API.STORAGE.RAT}=${result.data.token}; path=/; domain=.okp.localhost`;
            dispatch(toasterActions.addToast({
                status: "success",
                content: t("Logged in successfully"),
                duration: 5000,
            }));
            // return window.location.href = r("/");
        }
        const errorMessage = (
            (typeof result.msg === "object") && ("non_field_errors" in result.msg)
        ) ? result.msg.non_field_errors[0] : t("Unable to log in");
        dispatch(toasterActions.addToast({
            status: "error",
            content: errorMessage,
            duration: 2000,
        }));
        setFormErrors(result?.msg || {});
        setFormLoading(false);
    };

    return (
        <section>
            <div className="okp-card">
                <form className="okp-form" onSubmit={handleSubmit}>
                    <div className="okp-form-row">
                        <label htmlFor="okp-form-field-username">
                            <PencilLine size={16} /> <span>{t("Username")}</span>
                        </label>
                        <div className="okp-form-row-input">
                            <input type="text" id="okp-form-field-username" name="username" maxLength={NAME_MAX_LENGTH} value={formPayload.username} onKeyUp={handleFormUsernameKeyUp} onChange={handleFormUsernameChange} />
                            {formErrors.username?.length > 0 && (
                                <ul className="okp-form-row-errors">
                                    {formErrors.username.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <span className={`okp-form-row-count ${formPayload.username.length >= NAME_MAX_LENGTH ? "okp-error" : ""}`}>{formPayload.username.length}/{NAME_MAX_LENGTH}</span>
                    </div>
                    <div className="okp-form-row">
                        <label htmlFor="okp-form-field-password">
                            <PencilLine size={16} /> <span>{t("Password")}</span>
                        </label>
                        <div className="okp-form-row-input">
                            <input type="password" id="okp-form-field-password" name="password" maxLength={NAME_MAX_LENGTH} value={formPayload.password} onChange={handleFormPasswordChange} />
                            {formErrors.password?.length > 0 && (
                                <ul className="okp-form-row-errors">
                                    {formErrors.password.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <span className={`okp-form-row-count ${formPayload.password.length >= NAME_MAX_LENGTH ? "okp-error" : ""}`}>{formPayload.password.length}/{NAME_MAX_LENGTH}</span>
                    </div>
                    <div className="okp-form-actions">
                        <button type="reset" className="okp-btn okp-error" onClick={handleCancel} disabled={formLoading}>
                            <span>{t("Cancel")}</span>
                        </button>
                        <button type="submit" className="okp-btn okp-success" disabled={!formPayload.username || formLoading}>
                            <span>{t("Log In")}</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default function OkpAuthLoginForm() {
    return (
        <Providers>
            <AuthLoginForm />
        </Providers>
    );
}
