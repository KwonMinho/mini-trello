import { Request, Response } from "express";
import { UnauthorizedException } from "../common/exceptions";

// 최초 접근한 브라우저에서 접근 가능
export const verifyAATokenMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  // const anonymousToken: string = req.headers["anonymous-authorization"];
  console.log(req);
  next();
  // if (anonymousToken) {
  //   try {
  //   } catch (err) {
  //     next(new UnauthorizedException());
  //   }
  // } else {
  //   next(new UnauthorizedException());
  // }
};
