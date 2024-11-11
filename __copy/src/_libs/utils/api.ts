const API_URL = import.meta.env.API_URL || "django";
const API_PORT = import.meta.env.API_PORT || "8000";
const API_PROTOCOL = import.meta.env.API_ENV === "development" ? "http" : "https";
const BASE_URL = `${API_PROTOCOL}://${API_URL}:${API_PORT}/api`;

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
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
  getUser: () => fetchApi("/auth/me/"),
  getCharacters: () => fetchApi("/auth/me/characters/"),
};

export const coreApi = {
  getGames: () => fetchApi("/games/"),
};