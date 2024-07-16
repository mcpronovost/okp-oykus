// types

export type GameForumIndex = {
  id: Number;
  game: {
    id: Number;
    name: string;
    slug: string;
    founder: Number;
    owner: Number;
  };
  categories: {
    id: Number;
    name: string;
    description: string | null;
    sections: {
      id: Number;
      name: string;
      description: string | null;
    }[];
  }[];
};
