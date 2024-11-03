export interface Game {
  id: number;
  name: string;
  slug: string;
  abbr: string;
  version: string;
  created_at: string;
  updated_at: string;
  created?: number;
  updated?: number;
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
  abbr: string;
}
