import RequestWithUser from "../util/rest/request";
import logger from "../config/logger";
import URLParams from "../util/rest/urlparams";
import { NextFunction, Response } from "express";
import { Validator } from "class-validator";
import { SortOrder } from "../constants/SortOrder";

/**
 * Parse user agent data from header and add to Request
 * @param request
 * @param response
 * @param next
 */
const addSearchParams = (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const validator = new Validator();
    const params: URLParams = request.query;
    if (!params.limit) {
      params.limit = 25;
    }
    if (!params.offset) {
      params.offset = 0;
    }
    if (!validator.isEnum(params.order, SortOrder)) {
      params.order = SortOrder.DESC;
    }
    request.searchParams = params;
    next();
  } catch (error) {
    logger.warn(`Could not determine user agent`);
    next();
  }
};

export default addSearchParams;
