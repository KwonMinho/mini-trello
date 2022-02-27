import App from "./app";
import StateController from "./api/state/state.controller.js";

/**
 * @description: 서버 엔트리 포인트
 */
async function bootstrapServer() {
  const app: App = new App([new StateController()]);
  app.listen();
}

/*-Entry point-*/
bootstrapServer();
