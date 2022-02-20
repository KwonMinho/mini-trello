/**
 * 이 클래스는 모든 Renderer의 부모 클래스입니다.
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
   * @param {Element} base: 설정에서 사용되는 base 태그
   */
  constructor(base) {
    this.base = base;
    this._init();
  }

  /**
   * @description: 렌더러가 인스턴스될 때 호출되는 함수
   */
  _init() {}

  /**
   * @description: 랜더링 함수
   * @param {Element} tag: 베이스 태그에 조립되어야하는 태그
   */
  _render(tag) {
    this.base.appendChild(tag);
  }

  /**
   * @description: 랜더링 함수
   * @param {Element} replaceBase: 설정된 베이스 태그 대신에 사용하는 베이스 태그
   * @param {Element} tag: 베이스 태그에 조립되어야하는 태그
   */
  _renderer(replaceBase, tag) {
    replaceBase.appendChild(tag);
  }
}
