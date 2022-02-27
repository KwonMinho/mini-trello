import { Request, Response } from "express";

/**
 * @description: brower tap에서 http get 호출시, 자동으로 favicon.icon 요청하는 것에 대한 ignore 미들웨어
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export const ignoreFaviconMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  if (req.path.includes("favicon.ico")) {
    res.status(204).end();
    return;
  }
  next();
};
