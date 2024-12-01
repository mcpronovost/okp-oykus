import { api } from "@/services/api";
import { API } from "@/services/utils/constants";

export const authApi = {
    async login(username: string, password: string): Promise<any> {
        try {
            const response = await api.post("users/login/", {
                username,
                password,
            });
            const data = response instanceof Response ? await response.json() : response.data;
            if (data.token) {
                localStorage.setItem(API.STORAGE.RAT, data.token);
            }
            return data;
        } catch (e) {
            return e;
        }
    },
    async ping(): Promise<any> {
        try {
            const response = await api.get("ping/");
            return response;
        } catch (e) {
            return e;
        }
    },
};
