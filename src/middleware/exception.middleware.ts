import { CustomHttpException } from "../common/exceptions";
import { Request, Response } from "express";

/**
 * @description: 서버 내에서 발생하는 모든 exception를 핸들러하는 미들웨어
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.27
 */
export const exceptionMiddleware = (
  err: CustomHttpException,
  req: Request,
  res: Response,
  next: Function
) => {
  const status = err.status || 500;
  const message = err.message;

  res.status(status).send({
    status: status,
    message: message,
  });

  next();
};
