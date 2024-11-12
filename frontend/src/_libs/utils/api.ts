import type { User } from "@/_libs/types/auth.types";
import type { Character, Game } from "@/_libs/types/games.types";

const API_DOMAIN = import.meta.env.VITE_DOMAIN ?? "django";
const API_PROTOCOL = import.meta.env.VITE_NODE_ENV === "development" ? "http" : "https";
const API_URL = `${API_PROTOCOL}://${API_DOMAIN}/api`;

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: "include", // for handling cookies
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const authApi = {
  getUser: () => fetchApi<User>("/auth/me/"),
  getCharacters: () => fetchApi<Character[]>("/auth/me/characters/"),
};

export const gamesApi = {
  getGames: () => fetchApi<Game[]>("/games/"),
};