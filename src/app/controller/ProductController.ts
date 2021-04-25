import { NextFunction, Response, Router } from "express";
import { APP_CONSTANTS } from "../constants";
import { SearchParamsDto } from "../dto/BaseParamsDto";
import addSearchParams from "../middleware/searchMiddleware";
import validationMiddleware from "../middleware/validationMiddleware";
import { ProductService } from "../service/ProductService";
import { Formatter } from "../util/formatter";
import { handleRequest } from "../util/handleRequest";
import Controller from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

/**
 * Implementation of the Product Controller route.
 *
 * @param productService service implementation providing product related functionality
 */
class ProductController implements Controller {
  public path: string = `${APP_CONSTANTS.apiPrefix}/product`;
  public router: Router = Router();
  private fmt: Formatter = new Formatter();
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}`,
      addSearchParams,
      validationMiddleware(SearchParamsDto, APP_CONSTANTS.query),
      handleRequest(this.getAllProducts)
    );
  }

  /**
   * Get all product's based on the given params.
   *
   * @param searchParams Search params
   * @returns
   */
  private getAllProducts = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const { data, total } = await this.productService.getAllProducts(
      request.searchParams
    );
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  };
}

export default ProductController;
