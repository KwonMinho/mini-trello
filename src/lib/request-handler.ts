import Express from "express";

/**
 * @description: 원격 프로그램(핸들러)의 반환값을 json 형태로 변환하고 에러 발생시에 에러 처리 미들웨어로 흐름 제어하는 함수
 * @param {Funtion} handler: 특정 path에 맵핑될 원격 프로그램(핸들러)
 */
export const wrap: Function =
  (handler: Function) =>
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const response: any = await handler(req, res, next);
      res.json(response);
      next();
    } catch (err) {
      next(err);
    }
  };
