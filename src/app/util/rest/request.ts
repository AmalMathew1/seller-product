import { Request } from "express";
import URLParams from "./urlparams";

export default interface RequestWithUser extends Request {
  username: string;
  userId: string;
  role: string;
  startTime?: number;
  userAgent?: {[key: string]: any};
  searchParams?: URLParams; // TODO: perhaps change to Dto and add validation
}
