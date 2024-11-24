import type { RootState } from "@/services/utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authApi } from "@/services/api";

export default function Test() {
    const lang = useSelector((state: RootState) => state.common.lang);

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
        </>
    );
}
