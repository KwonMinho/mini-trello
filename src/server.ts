import App from "./app";
import VirtualStateController from "./api/virtual-state/virtual-state.controller.js";

/**
 * @description: 애플리케이션 서버 엔트리 포인트
 */
async function bootstrapServer() {
  const app: App = new App([new VirtualStateController()]);
  app.listen();
}

/*-Entry point-*/
bootstrapServer();
