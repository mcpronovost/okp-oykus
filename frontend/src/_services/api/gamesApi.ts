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
};
