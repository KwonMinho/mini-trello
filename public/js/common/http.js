/**
 * Http 통신을 지원하는 클래스
 *
 * @class Http
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class Http {
  /**
   * @description http(method: get) 통신하기 위한 함수
   * @param {string} url
   * @param {function} cb: http response 핸들러 함수
   *
   * 이 핸들러 함수의 첫번째 매개변수는
   * - status code가 200이 아닐때, "null"
   * - status code가 200일 때, "response data"
   */
  static get(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) cb(null);
        else cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }
  /**
   * @description http(method: post) 통신하기 위한 함수
   * @param {string} url
   * @param {object} data: http request body에 사용되는 데이터
   * @param {function} cb: http response 핸들러 함수
   *
   * 이 핸들러 함수의 첫번째 매개변수는
   * - status code가 200이 아닐때, "null"
   * - status code가 200일 때, "response data"
   */
  static post(url, data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status !== 200) cb(null);
        else cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(JSON.stringify(data));
  }
}
