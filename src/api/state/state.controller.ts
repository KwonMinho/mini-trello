import { Router, Request, Response } from "express";
import Controller from "../../common/interface/controller";
import StateService from "./state.service";
import { wrap } from "../../lib/request-handler";

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
      .get("/version/", wrap(this.getStateVersion.bind(this)))
      .post("/", wrap(this.updateState.bind(this)));

    this.router.use(this.path, router);
  }

  /**
   * @override
   */
  getRouter(): Router {
    return this.router;
  }

  getCurrentState(req: Request, res: Response): Object {
    return this.stateService.getCurrentState();
  }

  getStateVersion(req: Request, res: Response): boolean {
    const { version } = req.query;
    // if (version == undefined) return true;
    return this.stateService.isLatestVersion(Number(version));
  }

  updateState(req: Request, res: Response): number {
    const { type, payload } = req.body;
    return this.stateService.updateState(type, payload);
  }
}
