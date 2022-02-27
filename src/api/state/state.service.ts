import StateRepository from "./state.repository";
import StateLocalRepository from "./state.local-repository";
import { State, List, Card } from "./state.type";

export default class StateService {
  private stateRepository: StateRepository = new StateLocalRepository();

  public getCurrentState(): State {
    return this.stateRepository.getState();
  }

  public isLatestVersion(version: number) {
    const state: State = this.stateRepository.getState();
    return state.version === version;
  }

  public updateState(type: string, payload: any) {
    switch (type) {
      case "BOARD#ADD_LIST":
        this.addBoardList(payload.title);
        break;
      case "BOARD#ADD_CARD":
        this.addBoardCard(payload.id, payload.title, Number(payload.listId));
        break;
      case "BOARD#MOVE_CARD":
        this.moveBoardCard(
          payload.cardId,
          Number(payload.curListId),
          Number(payload.nextListId),
          payload.dropzoneId
        );
        break;
    }

    return this.stateRepository.updateVersion(
      this.stateRepository.getVersion() + 1
    );
  }

  private addBoardList(title: string): void {
    const list: List = {
      id: this.stateRepository.getBoard().length,
      title: title,
      cards: new Array<Card>(),
    };
    this.stateRepository.createList(list);
  }

  private addBoardCard(id: string, title: string, listId: number): void {
    const card: Card = {
      id: id,
      title: title,
    };
    this.stateRepository.createCard(listId, card);
  }

  /**
   * @param {object} updateData {cardId, curListId, nextListId, dropzoneId}
   */
  private moveBoardCard(
    cardId: string,
    curListId: number,
    nextListId: number,
    dropzoneId: string
  ): void {
    const card: Card = this.stateRepository.getBoardCard(curListId, cardId);
    this.stateRepository.insertBoardCard(nextListId, dropzoneId, card);
    this.stateRepository.deleteCard(curListId, cardId);
  }
}
