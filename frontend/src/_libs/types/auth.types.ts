export interface User {
  id: number;
  playername: string;
  abbr: string;
  avatar: string | null;
  fetched_at?: number;
}
