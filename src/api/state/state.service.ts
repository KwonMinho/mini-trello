import StateRepository from "./state.repository";
import StateLocalRepository from "./state.local-repository";
import { State, List, Card } from "./state.type";

/**
 * "브라우저 애플리케이션의 상태 도메인"에 대한 서비스 로직이 담긴 클래스
 *
 * @class StateController
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export default class StateService {
  private stateRepository: StateRepository = new StateLocalRepository();

  /**
   * @description: 서버에서 관리되는 브라우저 애플리케이션의 최신 상태 반환
   */
  public getCurrentState(): State {
    return this.stateRepository.getState();
  }

  /**
   * @description: 브라우저 애플리케이션의 상태가 최신 상태인지 아닌지를 반환
   */
  public isLatestVersion(version: number): boolean {
    const state: State = this.stateRepository.getState();
    return state.version === version;
  }

  /**
   * @description: 브라우저 애플리케이션의 상태 업데이트에 대한 작업
   */
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

    const newVersion: number = this.stateRepository.updateVersion(
      this.stateRepository.getVersion() + 1
    );
    return newVersion;
  }

  /**
   * @description: 상태에 새롭게 board의 list 추가
   * @param {string} title: 새롭게 추가되는 list의 타이틀
   */
  private addBoardList(title: string): void {
    const list: List = {
      id: this.stateRepository.getBoard().length,
      title: title,
      cards: new Array<Card>(),
    };
    this.stateRepository.createList(list);
  }

  /**
   * @description: 상태에 새롭게 board의 card 추가
   * @param {string} id: 새로운 card의 id(uuid format)
   * @param {string} title: 새로운 card의 타이틀
   * @param {number} listId: 새로운 card가 위치되는 list의 id
   */
  private addBoardCard(id: string, title: string, listId: number): void {
    const card: Card = {
      id: id,
      title: title,
    };
    this.stateRepository.createCard(listId, card);
  }

  /**
   * @description: 상태에 새롭게 board의 card 추가
   * @param {string} cardId: move-card(drag&drop되는 카드) 대한 아이디
   * @param {string} curListId: move-card가 위치한 list에 대한 아이디
   * @param {string} curNextListId: move card가 drop된 list에 대한 아이디
   * @param {string} dropzoneId: mover card가 drop된 dropzone에 대한 아이디
   */
  private moveBoardCard(
    cardId: string,
    curListId: number,
    nextListId: number,
    dropzoneId: string
  ): void {
    const card: Card = this.stateRepository.getBoardCard(curListId, cardId);
    this.stateRepository.deleteCard(curListId, cardId);
    this.stateRepository.insertBoardCard(nextListId, dropzoneId, card);
  }
}
