import { Router, Request, Response } from "express";
import Controller from "../../common/interface/controller";
import StateService from "./state.service";
import { wrap } from "../../lib/request-handler";
import {
  validGetVersionRequest,
  validUpdateStateRequest,
} from "./state.validation";

/**
 * 브라우저 애플리케이션의 "상태 도메인" 처리에 대한 컨트롤러
 *
 * @class StateController
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.25
 */
export default class StateController implements Controller {
  path: string = "/state";
  router: Router = Router();
  stateService: StateService = new StateService();

  constructor() {
    this.initalizeRouters();
  }

  /**
   * @override
   */
  initalizeRouters(): void {
    const router = Router();

    router
      .get("/", wrap(this.getCurrentState.bind(this)))
      .get(
        "/version/",
        validGetVersionRequest,
        wrap(this.getStateVersion.bind(this))
      )
      .post("/", validUpdateStateRequest, wrap(this.updateState.bind(this)));

    this.router.use(this.path, router);
  }

  /**
   * @override
   */
  getRouter(): Router {
    return this.router;
  }

  /**
   * @description GET "/api/state/" request 맵핑
   */
  private getCurrentState(req: Request, res: Response): Object {
    return this.stateService.getCurrentState();
  }

  /**
   * @description GET "/api/state/version" request 맵핑
   */
  private getStateVersion(req: Request, res: Response): boolean {
    const { version } = req.query;
    return this.stateService.isLatestVersion(Number(version));
  }

  /**
   * @description POST "/api/state/" request 맵핑
   */
  private updateState(req: Request, res: Response): number {
    const { type, payload } = req.body;
    return this.stateService.updateState(type, payload);
  }
}
