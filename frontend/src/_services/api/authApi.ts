import { api } from "@/services/api";

export const authApi = {
    async login(username: string, password: string): Promise<any> {
        try {
            const response = await api.post("users/login/", {
                username,
                password,
            });
            const data = response instanceof Response ? await response.json() : response.data;
            return {
                status: response.status,
                data,
            };
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
