export const ErrorCodes: CustomErrors = {
  SELLER_WITH_ID_NOT_FOUND: {
    CODE: "SELLER_WITH_ID_NOT_FOUND",
    MESSAGE: "No seller was found matching the id supplied",
  },
  PRODUCT_WITH_ID_NOT_FOUND: {
    CODE: "PRODUCT_WITH_ID_NOT_FOUND",
    MESSAGE: "No product was found matching the id supplied",
  }
};

interface CustomErrors {
  [key: string]: CustomError;
}

export interface CustomError {
  CODE: string;
  MESSAGE: string;
}
