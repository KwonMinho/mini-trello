import { Event } from "../../common/event.js";
import { generateUUID } from "../../common/uuid.js";

export class BoardStateManager {
  constructor() {
    this.boardState = [];
  }

  initState(boardState) {
    this.boardState = boardState;
    Event.domToStateListener(this.domEventHandler.bind(this));
    Event.stateToRenderer(
      Event.TYPE.BOARD.INIT,
      Event.MSG.STATE.init(this.boardState)
    );
  }

  domEventHandler(event) {
    const eventType = event.detail.type;
    const payload = event.detail.payload;

    switch (eventType) {
      case Event.TYPE.BOARD.INIT:
        console.log("board-init-evnet", payload);
        break;
      case Event.TYPE.BOARD.ADD_LIST:
        this.addList(payload);
        break;
      case Event.TYPE.BOARD.ADD_CARD:
        this.addCard(payload);
        break;
      case Event.TYPE.BOARD.MOVE_CARD:
        this.moveCard(payload);
        break;
    }
  }

  /**
   * @param {object} info {cardId, curListId, nextListId, afterCardId}
   */
  moveCard({ cardId, curListId, nextListId, afterCardId }) {
    const curList = this.boardState[Number(curListId)];
    const curCard = curList.cards.filter((card) => cardId === card.id)[0];
    curList.cards = curList.cards.filter((card) => cardId !== card.id);

    const nextList = this.boardState[Number(nextListId)];
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

  /**
   * @param {object} info {title}
   */
  addList({ title }) {
    const listId = this.boardState.length;

    this.boardState.push({
      id: listId,
      title: title,
      cards: [],
    });

    Event.stateToRenderer(
      Event.TYPE.BOARD.ADD_LIST,
      Event.MSG.STATE.addList(listId, title)
    );
  }

  /**
   * @param {object} info {title, rootId}
   */
  addCard({ title, rootId }) {
    const list = this.boardState.filter((list) => list.id === rootId)[0];
    const cardId = generateUUID();
    list.cards.push({
      id: cardId,
      title: title,
    });

    Event.stateToRenderer(
      Event.TYPE.BOARD.ADD_CARD,
      Event.MSG.STATE.addCard(cardId, title, rootId)
    );
  }
}
