/**
 * 모든 exception 클래스에 대한 부모 클래스
 *
 * @class CustomHttpException
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export class CustomHttpException extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
