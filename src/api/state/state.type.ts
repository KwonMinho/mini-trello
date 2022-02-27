export type State = {
  version: number;
  board: List[];
};

export type Card = {
  id: string;
  title: string;
};

export type List = {
  id: number;
  title: string;
  cards: Card[];
};
