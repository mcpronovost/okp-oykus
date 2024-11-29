import { api } from "@/services/api";

export const authApi = {
    async login(username: string, password: string): Promise<any> {
        try {
            const response = await api.post("users/login/", {
                username,
                password,
            });
            return response;
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
