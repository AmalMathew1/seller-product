import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request } from "express";
import * as express from "express";
import HttpException from "../exception/HttpException";
import { APP_CONSTANTS } from "../constants";
import { ErrorCodes } from "../util/errorCode";

/**
 * Validation middleware to handle request body parameters.
 *
 */
function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    const requestValidator = getRequestValidator(parameter, req);
    const requestBody = plainToClass(type, requestValidator);
    validate(
      requestBody, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorDetail = ErrorCodes.VALIDATION_ERROR;
          next(new HttpException(400, errorDetail.MESSAGE, errorDetail.CODE, errors));
        } else {
          // whitelist only in body of the request
          if (APP_CONSTANTS.body === parameter) {
            req.body = requestBody;
          }
          next();
        }
      });
  };
}

/**
 * Method to get request validator type based on the parameter.
 *
 */
function getRequestValidator(parameter: string, request: Request) {
  let requestValidator;
  switch (parameter) {
    case APP_CONSTANTS.body:
      requestValidator = request.body;
      break;
    case APP_CONSTANTS.params:
      requestValidator = request.params;
      break;
    case APP_CONSTANTS.query:
      requestValidator = request.query;
      break;
  }
  return requestValidator;
}

export default validationMiddleware;
