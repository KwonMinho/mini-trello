import { Event } from "../common/event.js";

/**
 * 보드 섹션 영역과 관련된 상태를 관리하는 매니저에 대한 클래스
 *
 * 해당 매니저는
 * - 태그 컴포넌트로 발생한 "CHANGE_TAG" 이벤트를(그 중에서 이벤트 타입인 Board) 캐치하여 보드 섹션의 상태를 변경히고
 * - 상태가 변경되었음을 다른 컴포넌트에 "CHANGE_STATE" 이벤트를 통해 알리는 역할
 *
 * @class BoardStateManager
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class BoardStateManager {
  // "State" 서비스 컴포넌트로 할당받은 상태 영역
  state;

  constructor(boardState) {
    this.state = boardState;
    this._init();
  }

  /**
   * @private
   * @description: BoardStateManager가 생성될 때 시작하는 함수
   */
  _init() {
    Event.changeTagListener(this._changeTagEventHandler.bind(this));
  }

  /**
   * @private
   * @description: "CHANGE_TAG" 이벤트에 대한 핸들러 함수
   * @param {object} event: "CHANGE_TAG" 이벤트 정보가 담긴 객체
   */
  _changeTagEventHandler(event) {
    const eventType = event.detail.type;
    const payload = event.detail.payload;

    switch (eventType) {
      case Event.TYPE.BOARD.INIT:
        this._initState(payload);
        break;
      case Event.TYPE.BOARD.ADD_LIST:
        this._addList(payload.title);
        break;
      case Event.TYPE.BOARD.ADD_CARD:
        this._addCard(payload.id, payload.title, payload.listId);
        break;
      case Event.TYPE.BOARD.MOVE_CARD:
        this._moveCard(
          payload.cardId,
          payload.curListId,
          payload.nextListId,
          payload.dropzoneId
        );
        break;
    }
  }

  /**
   * @private
   * @description: 보드 섹션의 상태를 초기화하고, 이벤트로 전달받은 현재 보드 섹션의 상태를 저장
   * @param {object} state: 현재 보드 섹션의 상태
   */
  _initState(state) {
    //Init boardState
    this.state.splice(0, this.state.length);

    for (const list of state) {
      this.state.push(list);
    }

    Event.changeState(
      Event.TYPE.BOARD.INIT,
      Event.PAYLOAD.STATE.init(this.state)
    );
  }

  /**
   * @private
   * @description: 리스트 추가로 인한 상태 업데이트
   * @param {string} title: 카드에 대한 타이틀
   */
  _addList(title) {
    const listId = this.state.length;

    this.state.push({
      id: listId,
      title: title,
      cards: [],
    });

    Event.changeState(
      Event.TYPE.BOARD.ADD_LIST,
      Event.PAYLOAD.STATE.addList(listId, title)
    );
  }

  /**
   * @private
   * @description: 카드 추가로 인한 상태 업데이트
   * @param {string} id: 카드에 대한 아이디
   * @param {string} title: 카드에 대한 타이틀
   * @param {number} listId: 카드에 대한 리스트 태그 아이디
   */
  _addCard(id, title, listId) {
    this.state[Number(listId)].cards.push({
      id: id,
      title: title,
    });

    Event.changeState(
      Event.TYPE.BOARD.ADD_CARD,
      Event.PAYLOAD.STATE.addCard(id, title, listId)
    );
  }

  /**
   * @private
   * @description: 카드의 이동으로 인한 상태 업데이트
   * @param {string} cardId: move-card(drag&drop되는 카드) 대한 태그 아이디
   * @param {string} curListId: drag&drop되는 카드가 위치한 리스트에 대한 태그 아이디
   * @param {string} curNextListId: move card가 drop된 리스트에 대한 태그 아이디
   * @param {string} dropzoneId: mover card가 drop된 드랍존에 대한 태그 아이디
   */
  _moveCard(cardId, curListId, nextListId, dropzoneId) {
    const curList = this.state[Number(curListId)];
    const nextList = this.state[Number(nextListId)];

    const curCard = curList.cards.filter((card) => cardId === card.id)[0];
    curList.cards = curList.cards.filter((card) => cardId !== card.id);

    if (nextList.cards.length == 0) {
      nextList.cards.push(curCard);
      return;
    }
    nextList.cards.forEach((card, index) => {
      if (card.id === dropzoneId) {
        nextList.cards.splice(index + 1, 0, curCard);
      }
    });
  }
  //class end
}
