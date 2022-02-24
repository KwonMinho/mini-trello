import { Event } from "../common/event.js";

export class BoardStateManager {
  constructor(boardState) {
    this.boardState = boardState;
    this.init();
  }

  init() {
    Event.domToStateListener(this.domEventHandler.bind(this));
  }

  domEventHandler(event) {
    const eventType = event.detail.type;
    const payload = event.detail.payload;

    switch (eventType) {
      case Event.TYPE.BOARD.INIT:
        this.initBoard(payload);
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
    console.log(JSON.stringify(this.boardState));
  }

  initBoard(boardState) {
    this.boardState.length = 0;
    this.boardState.splice(0, this.boardState.length);

    for (const list of boardState) {
      this.boardState.push(list);
    }

    Event.stateToRenderer(
      Event.TYPE.BOARD.INIT,
      Event.MSG.STATE.init(this.boardState)
    );
  }

  /**
   * @param {object} info {cardId, curListId, nextListId, dropzoneId}
   */
  moveCard({ cardId, curListId, nextListId, dropzoneId }) {
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
   * @param {object} info {id, title, rootId}
   */
  addCard({ id, title, rootId }) {
    const list = this.boardState.filter((list) => list.id === rootId)[0];
    list.cards.push({
      id: id,
      title: title,
    });

    Event.stateToRenderer(
      Event.TYPE.BOARD.ADD_CARD,
      Event.MSG.STATE.addCard(id, title, rootId)
    );
  }
}
