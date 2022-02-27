import { Request, Response } from "express";

/**
 * @description: 지원하지 않은 path에 대한 에러 페이지를 제공하는 미들웨어
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  res.send("<h1>여기에서는 서비스를 제공하지 않습니다!</h1>");
};
