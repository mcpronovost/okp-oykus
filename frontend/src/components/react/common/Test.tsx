import type { RootState } from "@/services/utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "@/services/utils/constants";
import { authApi } from "@/services/api";
import { getTranslation } from "@/services/i18n";

export default function Test() {
    const lang = useSelector((state: RootState) => state.common.lang);
    const { t } = getTranslation(lang);

    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const ping = async () => {
            const result = await authApi.login("mc", "1");
            if (result.token) {
                document.cookie = `${API.STORAGE.RAT}=${result.token}`;
            }
            setResult(JSON.stringify(result));
        };
        ping();
    }, []);

    return (
        <>
            <div>client : {result || "no result"}</div>
        </>
    );
}
