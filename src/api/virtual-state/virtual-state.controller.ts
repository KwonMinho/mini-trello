import { Router, Request, Response } from "express";
import Controller from "../../common/interface/controller";
import VirtualStateService from "./virtual-state.service";
import { wrap } from "../../lib/request-handler";

export default class VirtualStateController implements Controller {
  path: string = "/virtual-state";
  router: Router = Router();
  virtualStateService: VirtualStateService = new VirtualStateService();

  constructor() {
    this.initalizeRouters();
  }
  ///
  /// @ 서버 다시 켜지면서, 서버 런타임 아이디 부여하고 런타임 아이디 맞지 않으면- 콜백시킴

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
    return this.virtualStateService.getCurrentState();
  }

  getStateVersion(req: Request, res: Response): boolean {
    const { version } = req.query;
    // if (version == undefined) return true;
    return this.virtualStateService.isLatestVersion(Number(version));
  }

  updateState(req: Request, res: Response): number {
    const { type, payload } = req.body;
    return this.virtualStateService.updateState(type, payload);
  }
}
