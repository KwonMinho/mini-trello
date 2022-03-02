import { Router } from "express";

/**
 * 컨트롤러에 대한 인터페이스
 * 컨트롤러는 다음과 같은 역할을 수행합니다.
 * - http(s) 기반의 사용자 요청을(http path) 서비스를 제공하는 원격 프로그램에 연결함
 * - 해당 사용자 요청의 파라미터나 바디 값이 연결된 서비스에 유효한지 검사함
 *
 * @interface Controller
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export default interface Controller {
  path: string; // 원격 프로그램들을 맵핑할 http의 root path
  router: Router; // 원격 프로그램들을 맵핑에 사용된 router 객체
  initalizeRouters(): void; // 원격 프로그램들을 맵핑하는 작업을 수행하는 함수
  getRouter(): Router; // express router 객체 반환
}
