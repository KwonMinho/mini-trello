/**
 * 모든 Renderer의 부모 클래스
 * Renderer 클래스는 태그 컴포넌트를 생성하고 조립하는 역할을(Rendering) 수행합니다.
 *
 * @class Renderer
 * @field base: 랜더러가 랜더링 작업을 하는 기준 태그
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.21
 */
export class Renderer {
  /**
   * @public
   * @param {element} base: 랜더링 작업을 하는 기준 태그(root tag)
   */
  constructor({ base }) {
    this.base = base;
    this.__init();
  }

  /**
   * @protected
   * @description: 렌더러가 인스턴스될 때, 처음으로 시작하는 init 함수
   */
  __init() {}

  /**
   * @protected
   * @description: 랜더링 함수
   * @param {element} tag: 랜더링되어야하는 태그
   * @param {element} replaceBase: (option) 현재 설정된 베이스 대신에 사용하는 대체 베이스 태그
   */
  __render(tag, replaceBase) {
    if (replaceBase) replaceBase.appendChild(tag);
    else this.base.appendChild(tag);
  }

  /**
   * @protected
   * @description: base 태그를 초기화시키는 함수
   */
  __initBase() {
    while (this.base.firstChild) {
      this.base.firstChild.remove();
    }
  }
}
