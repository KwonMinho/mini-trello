import Express from "express";

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
