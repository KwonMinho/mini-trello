import { Event } from "../common/event.js";
import { Http } from "../common/http.js";

export class VirtualState {
  /**
   * @param {string} endpoint: endpoint of virtual state in server
   * @param {number} pollingTime: http 폴링 주기 (ms)
   * @param {string} pollingPath: 폴링을 보내는 path
   */
  constructor(endpoint, pollingTime, pollingPath) {
    this.state = { version: 0 };
    this.endpoint = endpoint;
    this.pollingTime = pollingTime;
    this.pollingPath = pollingPath;
    this.init();
  }

  init() {
    this.getInitVirtualState();
    this.startInterceptDomEvent();
  }

  isVirtualStateUpdated(fetchVersion) {
    return fetchVersion === this.state.version;
  }

  observerVirtualState() {
    const observer = setInterval(() => {
      const endpoint = `${this.endpoint}${this.pollingPath}?version=${this.state.version}`;

      Http.get(endpoint, (isLatestVersion) => {
        if (!isLatestVersion) {
          clearInterval(observer);
          this.getInitVirtualState();
          console.log("stop observer!");
        }
      });
    }, this.pollingTime);
  }

  getInitVirtualState() {
    Http.get(this.endpoint, (virtualState) => {
      if (!virtualState) {
        virtualState = { version: 0, board: [] };
      }
      this.state = virtualState;
      console.log("전달받은 init stteat");
      console.log(this.state);
      this.virtualInitBoardEvent(this.state.board);
      this.observerVirtualState();
    });
  }

  startInterceptDomEvent() {
    Event.domToStateListener((event) => {
      const eventType = event.detail.type;
      const payload = event.detail.payload;

      if (eventType === Event.TYPE.BOARD.INIT) return;
      Http.post(
        this.endpoint,
        {
          type: eventType,
          payload: payload,
        },
        (latestStateVersion) => {
          this.state.version = latestStateVersion;
        }
      );
    });
  }

  virtualInitBoardEvent(boardState) {
    Event.domToState(
      Event.TYPE.BOARD.INIT,
      Event.MSG.DOM.initBoard(boardState)
    );
  }
}
