import { Event } from "../common/event.js";
import { generateUUID } from "../common/uuid.js";

export class BoardState {
  constructor() {
    this.state = [];
    this.init();
  }

  init() {
    this.state = this.testFetch2();

    Event.updateState("init", this.state);

    this.startDomUpdateListener();
  }

  //ui update listener
  startDomUpdateListener() {
    const self = this;
    const board = document.querySelector("#board");

    board.addEventListener("dom-event", (event) => {
      const eventType = event.detail.type;
      const payload = event.detail.payload;

      switch (eventType) {
        case "add-list":
          self.addList(payload);
          break;
        case "add-card":
          self.addCard(payload);
          break;
        case "move-card":
          self.moveCard(payload);
          break;
      }
    });
  }

  /**
   * @param {object} info {cardId, curListId, nextListId, afterCardId}
   */
  moveCard(info) {
    const curList = this.state[Number(info.curListId)];
    const curCard = curList.cards.filter((card) => info.cardId === card.id)[0];
    curList.cards = curList.cards.filter((card) => info.cardId !== card.id);

    const nextList = this.state[Number(info.nextListId)];
    if (nextList.cards.length == 0) {
      nextList.cards.push(curCard);
      console.log(this.state);
      return;
    }
    nextList.cards.forEach((card, index) => {
      if (card.id === info.afterCardId) {
        console.log(index + 1);
        nextList.cards.splice(index + 1, 0, curCard);
      }
    });
  }

  /**
   * @param {object} info {title}
   */
  addList(info) {
    info.id = this.state.length;

    this.state.push({
      id: info.id,
      title: info.title,
      cards: [],
    });

    Event.updateState("add-list", info);
  }

  /**
   * @param {object} info {title, rootId}
   */
  addCard(info) {
    const list = this.state.filter((list) => list.id == info.rootId)[0];
    info.id = generateUUID();
    list.cards.push(info);
    Event.updateState("add-card", info);
  }

  testFetch() {
    return [];
  }

  testFetch2() {
    return [
      {
        id: 0,
        title: "미노노노",
        cards: [
          { id: "13gaaanwe", title: "aaaaaa" },
          { id: "13gnweaaa", title: "bbbbbb" },
          { id: "13gncccwe", title: "ccccc" },
          { id: "13gnddddwe", title: "dddd" },
        ],
      },
    ];
  }
}
