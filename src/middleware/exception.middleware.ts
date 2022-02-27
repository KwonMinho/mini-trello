import { CustomHttpException } from "../common/exceptions";
import { Request, Response } from "express";

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
