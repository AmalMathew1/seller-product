import Controller from "../util/rest/controller";
import { Router, NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import { Formatter } from "../util/formatter";

class HealthController implements Controller {
  public path: string = "/health";
  public router: Router = Router();

  private fmt: Formatter = new Formatter();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.get(`${this.path}`, this.healthResponse);
  }

  private healthResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Service Up"};
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
}

export default HealthController;
