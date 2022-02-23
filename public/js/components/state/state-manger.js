// import { RemoteStateApi } from "./remote-state-api.js";
import { BoardStateManager } from "./board-state-manager.js";

export class StateManger {
  constructor() {
    this.state = [];
    this.init();
  }

  /**
   *
   */
  async init() {
    this.boardStateManger = new BoardStateManager();
    // this.remoteStateApi = new RemoteStateApi();
    await this.fetchRemoteState();
    this.assignStateArea();
  }

  async fetchRemoteState() {
    console.log("fectchRemoteState() 아직 미구현");
  }

  assignStateArea() {
    this.state = this.testFetch2();
    this.boardStateManger.initState(this.state.board);
  }

  virtualDom() {}

  testFetch2() {
    return {
      board: [
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
      ],
    };
  }
}
