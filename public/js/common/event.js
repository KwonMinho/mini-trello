// 브라우저 애플리케이션의 Event 종류
const CHANGE_TAG = "change-tag";
const CHANGE_STATE = "change-state";

/**
 * 브라우저 애플리케이션의 "서비스 컴포넌트"끼리 통신할 때 사용하는 Event 규격 명세에 대한 클래스
 *
 * @class Event
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class Event {
  /**
   * @description: 메시지 타입
   */
  static TYPE = {
    BOARD: {
      INIT: "BOARD#INIT",
      ADD_LIST: "BOARD#ADD_LIST",
      ADD_CARD: "BOARD#ADD_CARD",
      MOVE_CARD: "BOARD#MOVE_CARD",
    },
  };

  /**
   * @description: 각 이벤트의 메시지 데이터를(payload) 명세된 규격에 맞게 생성하는 재네레이터들
   */
  static PAYLOAD = {
    /**
     * @description: "CHANGE_TAG" 이벤트의 메시지 데이터를(payload) 생성하는 재네레이터
     * */
    TAG: {
      /**
       * @param {BoardState} boardState
       * @returns {BoardStatePayload}
       * BoardStatePayload [
       *   List{id: number, title: string, cards:[] },
       *   List{id: number, title: string, cards:[] },
       *   ....
       * ]
       */
      initBoard(boardState) {
        return boardState;
      },
      /**
       * @param {string} moveCardId: move-card(drag&drop되는 카드) 대한 태그 아이디
       * @param {number} curListId: drag&drop되는 카드가 위치한 리스트에 대한 태그 아이디
       * @param {number} curNextListId: move card가 drop된 리스트에 대한 태그 아이디
       * @param {string} dropzoneId: mover card가 drop된 드랍존에 대한 태그 아이디
       * @returns {MoveCardPayload}
       * MoveCardPayload {
       *  cardId: string, curListId: number, curNextListId: number, dropzonedId: string
       * }
       */
      moveBoardCard(moveCardId, curListId, curNextListId, dropzoneId) {
        return {
          cardId: moveCardId,
          curListId: curListId,
          nextListId: curNextListId,
          dropzoneId: dropzoneId,
        };
      },

      /**
       * @param {string} id: board 섹션에 추가되는 리스트 혹은 카드에 대한 태그 아이디
       * @param {string} title: 리스트 혹은 카드에 대한 타이틀
       * @param {number} listId: (option) 카드에 대한 리스트 태그 아이디
       * @returns {AddBoardItemPayload}
       * AddBoardItemPayload {id: string, title: string, listId: number}
       */
      addBoardItem(id, title, listId) {
        if (listId == null) listId = -1;
        return {
          id: id,
          title: title,
          listId: listId,
        };
      },
    },
    /**
     * @description: "CHANGE_STATE" 이벤트의 메시지 데이터를(payload) 생성하는 재네레이터
     * */
    STATE: {
      /**
       * @param {BoardState} boardState
       * @returns {BoardStatePayload}
       * BoardStatePayload [
       *   List{id: number, title: string, cards:[] },
       *   List{id: number, title: string, cards:[] },
       *   ....
       * ]
       */
      init(boardState) {
        return boardState;
      },
      /**
       * @param {string} id: 리스트 아이디
       * @param {string} title: 리스트 타이틀
       * @returns {AddListPayload}
       * AddListPayload {id: string, title: string}
       */
      addList(id, title) {
        return {
          id: id,
          title: title,
        };
      },
      /**
       * @param {string} id: 카드에 대한 태그 아이디
       * @param {string} title: 카드에 대한 타이틀
       * @param {number} listId: 카드에 대한 리스트의 태그 아이디
       * @returns {AddListPayload}
       * AddCardPayload {id: string, title: string, listId: number}
       */
      addCard(id, title, listId) {
        return {
          id: id,
          title: title,
          listId: listId,
        };
      },
    },
  };

  /**
   * @description: "CHANGE_STATE" 이벤트 리스너를 등록하기 위한 함수
   * @param {function} cb: 이벤트 리스너 함수
   */
  static changeStateListener(cb) {
    const dom = document.querySelector("html");
    dom.addEventListener(CHANGE_STATE, cb);
  }

  /**
   * @description: "CHANGE_TAG" 이벤트 리스너를 등록하는 함수
   * @param {function} cb: 이벤트 리스너 함수
   */
  static changeTagListener(cb) {
    const dom = document.querySelector("html");
    dom.addEventListener(CHANGE_TAG, cb);
  }

  /**
   * @description: "CHANGE_TAG" 이벤트를 발생시키는 함수
   * @param {Event.TYPE} type: "CHANGE_TAG" 이벤트의 메시지 타입 (Event.TYPE)
   * @param {Event.PAYLOAD.TAG} payload: "CHANGE_TAG" 이벤트의 메시지 데이터 (Event.PAYLOAD.TAG)
   */
  static changeTag(type, payload) {
    document.querySelector("html").dispatchEvent(
      new CustomEvent(CHANGE_TAG, {
        detail: {
          type: type,
          payload: payload,
        },
      })
    );
  }

  /**
   * @description: "CHANGE_STATE" 이벤트를 발생시키는 함수
   * @param {Event.TYPE} type: "CHANGE_STATE" 이벤트의 메시지 타입 (Event.TYPE)
   * @param {Event.PAYLOAD.STATE} payload: "CHANGE_STATE" 이벤트의 메시지 데이터 (Event.PAYLOAD.SATATE)
   */
  static changeState(type, payload) {
    document.querySelector("html").dispatchEvent(
      new CustomEvent(CHANGE_STATE, {
        detail: {
          type: type,
          payload: payload,
        },
      })
    );
  }
}
