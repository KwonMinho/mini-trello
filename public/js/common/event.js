export class Event {
  static DOM_TO_STATE = "change-state";
  static STATE_TO_RENDERER = "change-dom";

  static TYPE = {
    BOARD: {
      INIT: "BOARD#INIT",
      ADD_LIST: "BOARD#ADD_LIST",
      ADD_CARD: "BOARD#ADD_CARD",
      MOVE_CARD: "BOARD#MOVE_CARD",
    },
  };

  static stateToRendererListener(cb) {
    const dom = document.querySelector("html");
    dom.addEventListener(Event.STATE_TO_RENDERER, cb);
  }

  static domToStateListener(cb) {
    const dom = document.querySelector("html");
    dom.addEventListener(Event.DOM_TO_STATE, cb);
  }

  //유효성 검사
  static MSG = {
    DOM: {
      moveBoardCard(moveCardId, curListId, curNextListId, dropzoneId) {
        return {
          cardId: moveCardId,
          curListId: curListId,
          nextListId: curNextListId,
          dropzoneId: dropzoneId,
        };
      },
      addBoardItem(title, rootId) {
        if (rootId == null) rootId = -1;
        return {
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

  static domToState(type, payload) {
    document.querySelector("html").dispatchEvent(
      new CustomEvent(Event.DOM_TO_STATE, {
        detail: {
          type: type,
          payload: payload,
        },
      })
    );
  }

  static stateToRenderer(type, payload) {
    document.querySelector("html").dispatchEvent(
      new CustomEvent(Event.STATE_TO_RENDERER, {
        detail: {
          type: type, // add-list, add-card, move-card
          payload: payload,
        },
      })
    );
  }
}
