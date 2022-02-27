import { Request, Response } from "express";

/**
 * @param
 */
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  res.send("<h1>여기에서는 서비스를 제공하지 않습니다!</h1>");
};
