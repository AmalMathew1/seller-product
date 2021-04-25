/**
 * Helper functions.
 */
import ApiResponse from "./rest/response";

export class Formatter {
  /**
   * Function to format response
   */
  public formatResponse = (
    result: any,
    time: number,
    message?: string,
    total?: number,
    hasNext?: boolean
  ): ApiResponse => {
    let numRecords: number = 0;
    let errors: Error = null;
    let data: any = null;

    if (result && result instanceof Array) {
      numRecords = result.length;
      data = result;
    } else if (result && result instanceof Error) {
      errors = result;
    } else if (result || result === 0) {
      numRecords = 1;
      data = result;
    }

    const response: ApiResponse = {
      data,
      errors,
      message: message ? message : null,
      meta: {
        length: numRecords,
        took: time,
        total: total ? total : numRecords,
        hasNext: hasNext ? hasNext : false,
      },
    };

    return response;
  };
}
