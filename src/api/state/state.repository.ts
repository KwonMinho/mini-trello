import { State, List, Card } from "./state.type";

/**
 * 상태 리포지토리에 대한 인터페이스
 *
 * @interface StateRepository
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.27
 */
export default interface StateRepository {
  getState(): State;
  getVersion(): number;
  getBoard(): List[];
  getBoardList(id: number): List;
  getBoardCard(listId: number, cardId: string): Card;
  createList(list: List): void;
  createCard(listId: number, card: Card): void;
  updateVersion(version: number): number;
  insertBoardCard(listId: number, location: string, addCard: Card): void;
  deleteCard(listId: number, cardId: string): void;
}
