import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import { EventEmitter } from "events";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import logger from "./config/logger";
import swaggerDocument from "./config/openapi.json";
import errorMiddleware from "./middleware/errorMiddleware";
import Controller from "./util/rest/controller";
import RequestWithUser from "./util/rest/request";
import cors = require("cors");

/**
 * Express application wrapper class to centralize initialization
 */
class App extends EventEmitter {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    super();
    this.app = express();
    this.app.use(cors());
    this.initializeSecurity();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeApiDocs();
  }

  /**
   * Starts the application listener (web server)
   */
  public listen() {
    this.app.listen(process.env.PORT, () => {
      logger.info(`App listening on the port ${process.env.PORT}`);
    });
  }

  /**
   * Return the app context.
   */
  public getServer() {
    return this.app;
  }

  /**
   * Adds security middleware to app
   */
  private initializeSecurity() {
    this.app.use(helmet.noCache());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
  }

  /**
   * Adds desired middleware to app
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(compression());

    // use for computing processing time on response
    this.app.use(
      (
        request: RequestWithUser,
        response: express.Response,
        next: express.NextFunction
      ) => {
        request.startTime = Date.now();
        next();
      }
    );
  }

  /**
   * Adds Swagger (OAPI) generated documentation route
   */
  private initializeApiDocs() {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  /**
   * Adds error middleware to app
   */
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  /**
   * Iterates through controllers in services/index and adds their routes/handlers to app
   * @param controllers
   */
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App;
