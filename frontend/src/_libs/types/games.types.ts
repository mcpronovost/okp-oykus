export interface Game {
  id: number;
  name: string;
  slug: string;
  abbr: string;
  version: string;
  logo?: string | null;
  created_at: string;
  updated_at: string;
  created_year?: number;
  updated_year?: number;
  founder?: {
    id: number;
    playername: string;
    abbr: string;
  };
  theme?: ThemeConfig;
}

export interface ThemeConfig {
  [key: string]: string;
}

export interface Character {
  id: number;
  name: string;
  abbr: string;
  slug: string;
  avatar: string | null;
  game: Game;
  created_at?: string;
  updated_at?: string;
}