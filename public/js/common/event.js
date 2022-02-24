const DOM_TO_STATE = "change-state";
const STATE_TO_RENDERER = "change-dom";

export class Event {
  static TYPE = {
    BOARD: {
      INIT: "BOARD#INIT",
      ADD_LIST: "BOARD#ADD_LIST",
      ADD_CARD: "BOARD#ADD_CARD",
      MOVE_CARD: "BOARD#MOVE_CARD",
    },
  };

  //유효성 검사
  static MSG = {
    DOM: {
      initBoard(boardState) {
        return boardState;
      },
      moveBoardCard(moveCardId, curListId, curNextListId, dropzoneId) {
        return {
          cardId: moveCardId,
          curListId: curListId,
          nextListId: curNextListId,
          dropzoneId: dropzoneId,
        };
      },
      addBoardItem(id, title, rootId) {
        if (rootId == null) rootId = -1;
        return {
          id: id,
          title: title,
          rootId: rootId,
        };
      },
    },
    STATE: {
      init(boardState) {
        return boardState;
      },
      addList(id, title) {
        return {
          id: id,
          title: title,
        };
      },
      addCard(id, title, rootId) {
        return {
          id: id,
          title: title,
          rootId: rootId,
        };
      },
    },
  };

  static stateToRendererListener(cb) {
    const dom = document.querySelector("html");
    dom.addEventListener(STATE_TO_RENDERER, cb);
  }

  static domToStateListener(cb) {
    const dom = document.querySelector("html");
    dom.addEventListener(DOM_TO_STATE, cb);
  }

  static domToState(type, payload) {
    document.querySelector("html").dispatchEvent(
      new CustomEvent(DOM_TO_STATE, {
        detail: {
          type: type,
          payload: payload,
        },
      })
    );
  }

  static stateToRenderer(type, payload) {
    document.querySelector("html").dispatchEvent(
      new CustomEvent(STATE_TO_RENDERER, {
        detail: {
          type: type, // add-list, add-card, move-card
          payload: payload,
        },
      })
    );
  }
}
