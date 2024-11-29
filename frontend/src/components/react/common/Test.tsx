import type { RootState } from "@/services/utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authApi } from "@/services/api";
import { getTranslation } from "@/services/i18n";

export default function Test() {
    const lang = useSelector((state: RootState) => state.common.lang);
    const { t } = getTranslation(lang);

    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const ping = async () => {
            const result = await authApi.login("", "");
            setResult(result);
        };
        ping();
    }, []);

    return (
        <>
            <div>client : {result || "no result"}</div>
            <div>lang : {lang}</div>
            <div>{t("Home")}</div>
            <div>0 {t("Categories", 0)}</div>
            <div>1 {t("Categories", 1)}</div>
            <div>2 {t("Categories", 2)}</div>
            <div>3 {t("Categories", 3)}</div>
            <div>{t("Untranslated")}</div>
        </>
    );
}
