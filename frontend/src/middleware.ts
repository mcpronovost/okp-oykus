import { DEFAULT_LANG } from "@/services/utils/constants";

export function onRequest(context: any, next: any) {
    const cookiesArray = context.request.headers.get("cookie")?.split("; ") || [];
    const cookies = cookiesArray.reduce((acc: Record<string, string>, cookie: string) => {
        const [key, value] = cookie.split("=");
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
    globalThis.currentCookies = cookies;
    globalThis.currentLang = context.params.lang || DEFAULT_LANG;

    return next();
}
