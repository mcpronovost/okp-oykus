import { api } from "@/services/api";

export const usersApi = {
    async me(): Promise<any> {
        try {
            const response = await api.get("users/me/");
            const data = response instanceof Response ? await response.json() : response.data;
            if (response.status === 200 && "id" in data) {
                return data;
            }
            return null;
        } catch {
            return null;
        }
    },
};
