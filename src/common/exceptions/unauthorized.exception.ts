import { CustomHttpException } from "./custom-http.exception";

/**
 * 허가받지 않은 사용자 요청에 대한 exception 클래스
 *
 * @class BadRequestException
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export class UnauthorizedException extends CustomHttpException {
  constructor(message: string = "인증 자격 증명이 유효하지 않습니다.") {
    super(401, message);
  }
}
