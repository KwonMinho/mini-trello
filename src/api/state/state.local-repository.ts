import StateRepository from "./state.repository";
import { State, List, Card } from "./state.type";

/**
 * 메모리 DB에 대한 상태 리포지토리
 *
 * @class StateMemoryRepository
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.27
 */
export default class StateLocalRepository implements StateRepository {
  db = { version: 0, board: new Array<List>() };

  getState(): State {
    return this.db;
  }

  getBoard(): List[] {
    return this.db.board;
  }

  getVersion(): number {
    return this.db.version;
  }

  getBoardCard(listId: number, cardId: string): Card {
    const list: List = this.getBoardList(listId);
    return list.cards.filter((card) => cardId === card.id)[0];
  }

  getBoardList(id: number): List {
    const board: List[] = this.getBoard();
    const findList = board.filter((list) => list.id === id)[0];
    return findList;
  }

  updateVersion(version: number): number {
    this.db.version = version;
    return this.db.version;
  }

  insertBoardCard(listId: number, location: string, addCard: Card): void {
    const list: List = this.getBoardList(listId);
    if (list.cards.length == 0) {
      list.cards.push(addCard);
      return;
    }

    let index: number = 0;
    for (const card of list.cards) {
      if (card.id === location) {
        list.cards.splice(index + 1, 0, addCard);
        return;
      }
      index += 1;
    }

    list.cards.splice(0, 0, addCard);
  }

  createList(list: List): void {
    const board: List[] = this.getBoard();
    board.push(list);
  }

  createCard(listId: number, card: Card): void {
    const list: List = this.getBoardList(listId);
    list.cards.push(card);
  }

  deleteCard(listId: number, cardId: string): void {
    const curList: List = this.getBoardList(listId);
    curList.cards = curList.cards.filter((card) => cardId !== card.id);
  }
}
