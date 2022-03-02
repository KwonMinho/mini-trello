import { Event } from "../common/event.js";
import { Http } from "../common/http.js";

/**
 * VirtualDom 서비스 컴포넌트에 대한 클래스
 *
 * VirtualDom의 역할은 다음과 같습니다.
 * - 브라우저 애플리케이션의 dom에서 발생한 "CHANGE_TAG" 이벤트를 캐치하고, 이를 서버에 전달하여 virtual state를 업데이트
 * - 지속적으로 서버의 virtual state가 업데이트되었는지 확인하고 virtual state를 가져와, 브라우저 애플리케이션의 상태가 virtual state와 동기화
 *
 * @class VirtualDom
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class VirtualDom {
  version; // virtual-state의 버전
  endpoint;
  pollingTime;
  pollingPath;

  /**
   * @param {string} endpoint: VirtualState가 있는 서버의 endpoint
   * @param {number} pollingTime: http의 폴링 주기 (ms)
   * @param {string} pollingPath: 폴링을 보내는 경로
   */
  constructor({ endpoint, pollingTime, pollingPath }) {
    this.version = 0;
    this.endpoint = endpoint;
    this.pollingTime = pollingTime;
    this.pollingPath = pollingPath;
    this._init();
  }

  /**
   * @private
   * @description: virtual-dom이 처음으로 시작할 때 실행되는 함수
   */
  _init() {
    this._getVirtualState();
    this._interceptChangeTagEvent();
  }

  /**
   * @private
   * @description: 서버의 virtual-state 요청
   */
  _getVirtualState() {
    Http.get(this.endpoint, this._getVirtualStateHandler.bind(this));
  }

  /**
   * @private
   * @description: 서버의 virtual-state 요청에 대한 핸들러함수
   */
  _getVirtualStateHandler(virtualState) {
    if (!virtualState) return;

    this.version = virtualState.version;
    this._changeBoardSectionTagEvent(virtualState.board);
    this._checkVirtualStateVersion();
  }

  /**
   * @private
   * @description: 서버의 virtual-state 가져왔을때, "CHANGE_TAG" 이벤트를 발생시키는 함수
   * @param {element} boardState: virtual-state에서 board 상태
   */
  _changeBoardSectionTagEvent(boardState) {
    Event.changeTag(
      Event.TYPE.BOARD.INIT,
      Event.PAYLOAD.TAG.initBoard(boardState)
    );
  }

  /**
   * @private
   * @description: "CHANGE_TAG" 이벤트를 캐치하여, 서버의 virtual-state로 전달하는 함수
   */
  _interceptChangeTagEvent() {
    Event.changeTagListener((event) => {
      const eventType = event.detail.type;
      const payload = event.detail.payload;

      // Event.TYPE.BOARD.INIT은 서버로 전달할 필요가 없음
      if (eventType === Event.TYPE.BOARD.INIT) return;
      // 서버의 virtual-state로 전달
      Http.post(
        this.endpoint,
        {
          type: eventType,
          payload: payload,
        },
        (latestStateVersion) => {
          this.version = latestStateVersion;
        }
      );
    });
  }

  /**
   * @private
   * @description: 지속적으로 서버의 virtual-state의 버전을 체크하는 함수
   */
  _checkVirtualStateVersion() {
    const observer = setInterval(() => {
      const url = `${this.endpoint}${this.pollingPath}?version=${this.version}`;
      Http.get(url, (isLatestVersion) => {
        // http에러가 발생하지 않았다면
        if (!isLatestVersion) {
          clearInterval(observer);
          this._getVirtualState();
        }
      });
    }, this.pollingTime);
  }
}
