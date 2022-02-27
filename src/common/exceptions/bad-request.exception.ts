import { CustomHttpException } from "./custom-http.exception";

/**
 * 잘못된 HTTP 요청에 대한 exception 클래스
 *
 * @class BadRequestException
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export class BadRequestException extends CustomHttpException {
  constructor(message: string = "잘못된 요청입니다.") {
    super(400, message);
  }
}
