export class Event {
  static updateState(type, payload) {
    document.querySelector("#board").dispatchEvent(
      new CustomEvent("update-state", {
        detail: {
          type: type, // init, create, move
          payload: payload,
        },
      })
    );
  }

  static updateDom(type, payload) {
    document.querySelector("#board").dispatchEvent(
      new CustomEvent("dom-event", {
        detail: {
          type: type, // add-list, add-card, move-card
          payload: payload,
        },
      })
    );
  }
}
