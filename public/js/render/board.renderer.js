import { Renderer } from "./renderer.js";
import { generateUUID } from "../common/uuid.js";
import { BoardItemEnum } from "../common/enums.js";
import { Event } from "../common/event.js";
import { List } from "../view/list.js";
import { AddItem } from "../view/additem.js";
import { Dropzone } from "../view/dropzone.js";
import { Card } from "../view/card.js";

/**
 * 이 클래스는 Board-Renderer 컴포넌트입니다.
 * 해당 클래스에서는 State-Storage와 브라우저 앱 UI 사이에서 상호작용하여, board와 관련된 태그 아이템를 생성하고 조립하는 역할입니다.
 *
 * @class BoardRenderer
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.21
 */
export class BoardRenderer extends Renderer {
  /**
   * @override
   * @protected
   * @description: board 인스턴스될 때 실행되는 함수
   */
  __init() {
    this.boardInitRender();
    Event.stateToRendererListener(this.stateEventHandler.bind(this));
  }

  boardInitRender() {
    const addListItem = AddItem.createAddItem(BoardItemEnum.LIST);
    this.__render(addListItem, document.querySelector("#board"));
  }

  stateEventHandler(event) {
    switch (event.detail.type) {
      case Event.TYPE.BOARD.INIT:
        this.initRender(event.detail.payload);
        break;
      case Event.TYPE.BOARD.ADD_LIST:
        this.listRender(event.detail.payload);
        break;
      case Event.TYPE.BOARD.ADD_CARD:
        this.cardRender(event.detail.payload);
        break;
    }
  }

  cardRender(info) {
    const cardItem = Card.createCard(info.id, info.title);
    const cardDropzone = Dropzone.createDropzone(info.id);
    const list = document.getElementById(`${info.rootId}`);
    const listCards = list.childNodes[1];
    this.__render(cardItem, listCards);
    this.__render(cardDropzone, listCards);
  }

  listRender(info) {
    const listItem = List.createList(
      info.id,
      info.title,
      AddItem.createAddItem(BoardItemEnum.CARD, info.id),
      Dropzone.createDropzone(generateUUID())
    );
    this.__render(listItem);
  }

  /**
   * @refactory
   * @description: board-state가 초기화될 때 실행되는 렌더링 함수
   * @param {Array} state: board-state에서 가져온 상태
   */
  initRender(state) {
    this.__initBase();
    console.log("init-render");
    console.log(state);
    state.forEach((list, id) => {
      const listItem = List.createList(
        id,
        list.title,
        AddItem.createAddItem(BoardItemEnum.CARD, id),
        Dropzone.createDropzone(generateUUID())
      );
      const listCards = listItem.childNodes[1];

      list.cards.forEach((card) => {
        const cardItem = Card.createCard(card.id, card.title);
        const cardDropzone = Dropzone.createDropzone(card.id);

        this.__render(cardItem, listCards);
        this.__render(cardDropzone, listCards);
      });
      this.__render(listItem);
    });
  }
}
