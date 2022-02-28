/**
 * 이 파일은 state 도메인에서 사용되는 타입들 입니다.
 */

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
