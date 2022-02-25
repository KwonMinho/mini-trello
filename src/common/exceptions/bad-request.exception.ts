import { CustomHttpException } from "./custom-http.exception";

export class BadRequestException extends CustomHttpException {
  constructor(message: string = "잘못된 요청입니다.") {
    super(400, message);
  }
}
