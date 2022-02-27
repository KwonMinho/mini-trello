import { Router, Request, Response } from "express";
import Controller from "../../common/interface/controller";
import StateService from "./state.service";
import { wrap } from "../../lib/request-handler";
import {
  validGetVersionRequest,
  validUpdateStateRequest,
} from "./state.validation";

/**
 * @
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
        wrap(validGetVersionRequest),
        wrap(this.getStateVersion.bind(this))
      )
      .post(
        "/",
        wrap(validUpdateStateRequest),
        wrap(this.updateState.bind(this))
      );

    this.router.use(this.path, router);
  }

  /**
   * @override
   */
  getRouter(): Router {
    return this.router;
  }

  private getCurrentState(req: Request, res: Response): Object {
    return this.stateService.getCurrentState();
  }

  private getStateVersion(req: Request, res: Response): boolean {
    const { version } = req.query;

    return this.stateService.isLatestVersion(Number(version));
  }

  private updateState(req: Request, res: Response): number {
    const { type, payload } = req.body;

    return this.stateService.updateState(type, payload);
  }
}
