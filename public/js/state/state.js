import { BoardStateManager } from "./board-state-manager.js";

export class State {
  constructor() {
    this.state = {};
    this.assignStateArea();
  }

  /**
   *
   */
  async init() {
    this.boardStateManger = new BoardStateManager();
    // this.remoteStateApi = new RemoteStateApi();
    this.assignStateArea();
  }

  assignStateArea() {
    this.state.board = [];
    this.boardStateManger = new BoardStateManager(this.state.board);
  }

  virtualDom() {}
}
