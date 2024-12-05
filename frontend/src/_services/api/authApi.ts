import { api } from "@/services/api";

export const authApi = {
    async register(username: string, password: string): Promise<any> {
        try {
            const response = await api.post("users/register/", {
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
    async logout(): Promise<any> {
        try {
            const response = await api.post("users/logout/");
            return response;
        } catch (e) {
            return e;
        }
    },
};
