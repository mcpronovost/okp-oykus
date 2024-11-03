import { user } from "@/stores/storeAuth";

export async function getUser(api: string) {
  try {
    const response = await fetch(`${api}/auth/me/`, {
      credentials: "include"
    });
    if (!response.ok) return;
    const data = await response.json();
    user.set(data);
    return data;
  } catch {
    return null;
  }
}