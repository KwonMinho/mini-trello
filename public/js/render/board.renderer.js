import { Renderer } from "./renderer.js";
import { generateUUID } from "../common/uuid.js";
import { BoardTagEnum } from "../common/enums.js";
import { Event } from "../common/event.js";
import { List } from "../view/list.js";
import { AddItem } from "../view/additem.js";
import { Dropzone } from "../view/dropzone.js";
import { Card } from "../view/card.js";

/**
 * Board-Renderer 서비스 컴포넌트에 대한 클래스
 *
 * Board-Renderer는 board와 관련된 태그 컴포넌트를 생성하고 조립하는 역할입니다.(랜더링 작업)
 * board-state-manager 컴포넌트에서 발생시킨 CHANGE_EVNET를 받을때 랜더링 작업을 수행합니다.
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
   * @description: 보드 랜더러의 시작 함수
   */
  __init() {
    this._initRender();
    Event.changeStateListener(this._changeStateEventHandler.bind(this));
  }

  /**
   * @prviate
   * @description: 초기 board 섹션에 필요한 태그를 랜더하는 함수
   */
  _initRender() {
    this.__render(
      AddItem.createAddItem(BoardTagEnum.LIST),
      document.querySelector("#board")
    );
  }

  /**
   * @private
   * @description: "CHANGE_STATE" 이벤트에 대한 핸들러 함수
   * @param {object} event: "CHANGE_STATE" 이벤트 정보가 담긴 객체
   */
  _changeStateEventHandler(event) {
    const type = event.detail.type;
    const payload = event.detail.payload;

    switch (type) {
      case Event.TYPE.BOARD.INIT:
        this._renderBoard(payload);
        break;
      case Event.TYPE.BOARD.ADD_LIST:
        this._renderList(payload.id, payload.title);
        break;
      case Event.TYPE.BOARD.ADD_CARD:
        this._renderCard(payload.id, payload.title, payload.listId);
        break;
    }
  }

  /**
   * @private
   * @description: 카드를 랜더링하는 함수
   * @param {string} id: 카드에 대한 아이디
   * @param {string} title: 카드에 대한 타이틀
   * @param {number} listId: 카드에 대한 리스트 태그 아이디
   */
  _renderCard(id, title, listId) {
    const card = Card.createCard(id, title);
    const cardDropzone = Dropzone.createDropzone(id);
    const list = document.getElementById(`${listId}`);
    const listCards = list.childNodes[1];

    this.__render(card, listCards);
    this.__render(cardDropzone, listCards);
  }

  /**
   * @private
   * @description: 리스트를 랜더링하는 함수
   * @param {number} id: 리스트에 대한 태그 아이디
   * @param {string} title: 리스트에 대한 타이틀
   */
  _renderList(id, title) {
    const list = List.createList(
      id,
      title,
      AddItem.createAddItem(BoardTagEnum.CARD, id),
      Dropzone.createDropzone(generateUUID())
    );
    this.__render(list);
  }

  /**
   * @private
   * @description: board 섹션의 상태가 초기화되거나 변경될 때 실행되는 렌더링 함수
   * @param {object} state: board 섹션의 상태 (board-state-manager에서 관리하는 상태)
   */
  _renderBoard(state) {
    this.__initBase();
    state.forEach((list, id) => {
      this._renderList(id, list.title);

      list.cards.forEach((card) => {
        console.log(card);
        this._renderCard(card.id, card.title, id);
      });
    });
  }
}
