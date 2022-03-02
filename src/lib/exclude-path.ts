import { Request, Response } from "express";

/**
 * @function
 * @description: 미들웨어에서 제외할 paths를 설정하는 함수
 * @param {string[]} paths: 미들웨어를 적용하지 않을 path들
 * @param {Fucntion} middleware: 미들웨어
 */
export default function (paths: string[], middleware: Function) {
  return (req: Request, res: Response, next: Function) => {
    for (const path of paths) {
      if (req.path === path) {
        next();
        return;
      }
    }
    return middleware(req, res, next);
  };
}
