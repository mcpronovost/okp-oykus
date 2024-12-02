import { api } from "@/services/api";

export const gamesApi = {
    async create(name: string): Promise<any> {
        try {
            const response = await api.post("games/", {
                name,
            });
            return response;
        } catch (e) {
            return e;
        }
    },
    async managementList(): Promise<any> {
        try {
            const response = await api.get("games/management/list/");
            const data = response instanceof Response ? await response.json() : response.data;
            return data;
        } catch (e) {
            return e;
        }
    },
};
