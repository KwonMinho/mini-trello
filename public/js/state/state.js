import { BoardStateManager } from "./board-state-manager.js";

/**
 * 브라우저 애플리케이션의 상태를 관리하는 서비스 컴포넌트 클래스
 *
 * "State" 에서는 애플리케이션의 상태를 생성하고,
 * 각 상태 매니저에게 상태에 특정 영역을 할당하는 작업을 수행합니다.
 *
 * @class State
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class State {
  // 브라우저 애플리케이션의 상태
  state;

  // 상태 매니저들
  boardStateManager;

  constructor() {
    this._initState();
    this._assignStateArea();
  }

  /**
   * @private
   * @description: 브라우저 애플리케이션의 상태를 초기화하고 이를 여러 영역 구간으로 분할
   */
  _initState() {
    this.state = {};
    this.state.board = [];
  }

  /**
   * @private
   * @description: 각 상태 매니저를 생성하고, 매니저에게 상태의 영역 구간을 할당
   */
  _assignStateArea() {
    this.boardStateManager = new BoardStateManager(this.state.board);
  }
}
