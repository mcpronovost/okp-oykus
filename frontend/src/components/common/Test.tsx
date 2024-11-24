import { useEffect, useState } from "react";
import { authService } from "@/services/api";

export default function Test() {
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const ping = async () => {
            const result = await authService.login("", "");
            setResult(result);
        };
        ping();
    }, []);

    return <div>client : {result || "no result"}</div>;
}
