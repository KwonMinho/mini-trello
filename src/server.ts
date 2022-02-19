import App from "./app";

/**
 * @description: 애플리케이션 서버 엔트리 포인트
 */
async function bootstrapServer() {
  const app: App = new App([]);
  app.listen();
}

/*-Entry point-*/
bootstrapServer();
