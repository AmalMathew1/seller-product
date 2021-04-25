import { NextFunction, Response } from "express";
import RequestWithUser from "./rest/request";

const handleRequest = (requestHandler: any) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
export { handleRequest };
