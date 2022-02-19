import express, {
  Request,
  Response,
  NextFunction,
  Application,
  Router,
} from "express";
import Controller from "./common/interface/Controller";

/**
 * 이 클래스는 express 기반으로 작성된 애플리케이션 서버 클래스입니다.
 * 해당 클래스에서는 애플리케이션 서버 생성 및 시작, 미들웨어 및 컨트롤러와 같은 설정 등을 수행합니다.
 *
 * @class App
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.19
 */
class App {
  private app: Application;

  /**
   * @description: 애플리케이션 서버 인스턴스를 생성하고, 해당 서버에 필요한 미들웨어, 컨트롤러, 에러 핸들러 등을 설정
   * @param {Controller[]} controllers 애플리케이션 서버에 추가할 컨트롤러 리스트
   */
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initDefaultMiddlerwares();
    this.initControllers(controllers);
  }

  /**
   * @description: 애플리케이션 서버를 시작 (default port: 8888)
   */
  public listen(): void {
    const port: number = Number(process.env.PORT) || 8888;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  /**
   * @description: 애플리케이션 서버를 반환
   * @return {Application}: 애플리케이션 서버
   */
  public getServer(): Application {
    return this.app;
  }

  /**
   * @description: 애플리케이션 서버에 필요한 기본 미들웨어들 설정
   */
  private initDefaultMiddlerwares(): void {
    this.app.use(express.json());
    this.app.use(express.static(`${__dirname}/../public`));
  }

  /**
   * @description: 애플리케이션 서버에 필요한 view 컨트롤러와 API 컨트롤러들 설정
   * @param {Function[]} controllers 애플리케이션 서버에 추가할 컨트롤러 리스트
   */
  private initControllers(controllers: Controller[]): void {
    const router: Router = Router();

    // 사용자 브라우저에서 실행할 애플리케이션 반환
    router.get("/", (req: Request, res: Response) => {
      res.sendFile(`${__dirname}/../public/index.html`);
    });

    // API 컨트롤러들 라우터에 설정
    controllers.forEach((controller: Controller) => {
      router.use(controller.getRouter());
    });

    this.app.use("/api", router);
  }

  //private initErrorHandler(): void {}
}

export default App;
