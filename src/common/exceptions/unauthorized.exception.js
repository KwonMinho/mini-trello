import { CustomHttpException } from "./custom-http.exception";

export class UnauthorizedException extends CustomHttpException {
  constructor(message = "인증 자격 증명이 유효하지 않습니다.") {
    super(401, message);
  }
}
