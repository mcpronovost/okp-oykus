import type { AppDispatch, RootState } from "@/services/utils/types";
import Providers from "@/components/react/Providers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilLine, Plus } from "lucide-react";
import { gamesApi } from "@/services/api";
import { getTranslation } from "@/services/i18n";
import { getRoute } from "@/services/router";
import { toasterActions } from "@/services/store/slices/toaster";

export function GamesCreate() {
    const dispatch = useDispatch<AppDispatch>();
    const lang = useSelector((state: RootState) => state.common.lang);
    const { t } = getTranslation(lang);
    const { r } = getRoute(lang);
    const NAME_MAX_LENGTH = 120;

    const [formPayload, setFormPayload] = useState({
        name: "",
    });
    const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

    const handleFormNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPayload({
            ...formPayload,
            name: event.target.value,
        });
    };

    const handleFormNameKeyUp = () => {
        if (formPayload.name.length > NAME_MAX_LENGTH) {
            setFormPayload({
                ...formPayload,
                name: formPayload.name.slice(0, NAME_MAX_LENGTH),
            });
        }
    };

    const handleCancel = () => {
        window.location.href = r("management/games");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormErrors({});
        const result = await gamesApi.create(formPayload.name);
        if (result.status === 201) {
            dispatch(toasterActions.addToast({
                status: "success",
                content: t("Game created successfully"),
                duration: 5000,
            }));
            return window.location.href = r("management/games");
        }
        const errorMessage = (
            (typeof result.msg === "object") && ("non_field_errors" in result.msg)
        ) ? result.msg.non_field_errors[0] : t("Unable to create a new game");
        dispatch(toasterActions.addToast({
            status: "error",
            content: errorMessage,
            duration: 2000,
        }));
        setFormErrors(result?.msg || {});
    };

    return (
        <section>
            <div className="okp-card">
                <form className="okp-form" onSubmit={handleSubmit}>
                    <div className="okp-form-row">
                        <label htmlFor="okp-form-field-name">
                            <PencilLine size={16} /> <span>{t("Name")}</span>
                        </label>
                        <div className="okp-form-row-input">
                            <input type="text" id="okp-form-field-name" name="name" maxLength={NAME_MAX_LENGTH} value={formPayload.name} onKeyUp={handleFormNameKeyUp} onChange={handleFormNameChange} />
                            {formErrors.name?.length > 0 && (
                                <ul className="okp-form-row-errors">
                                    {formErrors.name.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <span className={`okp-form-row-count ${formPayload.name.length >= NAME_MAX_LENGTH ? "okp-error" : ""}`}>{formPayload.name.length}/{NAME_MAX_LENGTH}</span>
                    </div>
                    <div className="okp-form-actions">
                        <button type="reset" className="okp-btn okp-error" onClick={handleCancel}>
                            <span>{t("Cancel")}</span>
                        </button>
                        <button type="submit" className="okp-btn okp-success" disabled={!formPayload.name}>
                            <span>{t("Create")}</span>
                            <Plus size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default function OkpGamesCreate() {
    return (
        <Providers>
            <GamesCreate />
        </Providers>
    );
}
