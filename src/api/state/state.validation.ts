import { BadRequestException } from "../../common/exceptions";
import { Request, Response } from "express";

/**
 * @description:  POST "/api/state" request의 body 값들에 대한 유효성 검증
 */
export const validUpdateStateRequest = (
  req: Request,
  res: Response,
  next: Function
): void => {
  const type: string = <string>req.body.type;
  const payload: any = <object>req.body.payload;

  if (typeof payload !== "object") {
    next(new BadRequestException("해당 요청의 payload가 유효하지 않습니다"));
    return;
  }

  let exceptionMsg: string[] = new Array<string>();

  switch (type) {
    case "BOARD#ADD_LIST":
      if (payload.title === undefined)
        exceptionMsg.push("해당 type에서는 payload에서 title 값은 필수입니다");
      break;
    case "BOARD#ADD_CARD":
      if (payload.id === undefined)
        exceptionMsg.push("해당 type에서는 payload에서 title 값은 필수입니다");
      if (payload.title === undefined)
        exceptionMsg.push("해당 type에서는 payload에서 id 값은 필수입니다");
      if (payload.listId === undefined)
        exceptionMsg.push("해당 type에서는 payload에서 listId 값은 필수입니다");
      break;
    case "BOARD#MOVE_CARD":
      if (payload.cardId === undefined)
        exceptionMsg.push("해당 type에서는 payload에서 cardId 값은 필수입니다");
      if (payload.curListId === undefined)
        exceptionMsg.push(
          "해당 type에서는 payload에서 curListId 값은 필수입니다"
        );
      if (payload.nextListId === undefined)
        exceptionMsg.push(
          "해당 type에서는 payload에서 nextListId 값은 필수입니다"
        );
      if (payload.dropzoneId === undefined)
        exceptionMsg.push(
          "해당 type에서는 payload에서 dropzoneId 값은 필수입니다"
        );
      break;
    default:
      next(new BadRequestException("해당 요청의 타입은 존재하지 않습니다"));
      return;
  }

  if (exceptionMsg.length !== 0) {
    next(new BadRequestException(exceptionMsg.toString()));
    return;
  }

  next();
};

/**
 * @description:  GET "/api/state/version" request의 param 값에 대한 유효성 검증
 */
export const validGetVersionRequest = (
  req: Request,
  res: Response,
  next: Function
): void => {
  const version: string = <string>req.query.version;
  if (!version) {
    next(new BadRequestException("version 값이 존재하지 않습니다"));
    return;
  }
  if (isNaN(version as any)) {
    next(new BadRequestException("version 값이 유효하지 않습니다"));
    return;
  }
  next();
};
