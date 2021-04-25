import { NextFunction, Response, Router } from "express";
import { APP_CONSTANTS } from "../constants";
import { SearchParamsDto } from "../dto/BaseParamsDto";
import { ProductCreateDto } from "../dto/ProductCreateDto";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { SellerCreateDto } from "../dto/SellerCreateDto";
import { SellerUpdateDto } from "../dto/SellerUpdateDto";
import addSearchParams from "../middleware/searchMiddleware";
import validationMiddleware from "../middleware/validationMiddleware";
import { SellerService } from "../service/SellerService";
import { Formatter } from "../util/formatter";
import { handleRequest } from "../util/handleRequest";
import Controller from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

/**
 * Implementation of the Seller Controller route.
 *
 * @param sellerService service implementation providing seller related functionality
 */
class SellerController implements Controller {
  public path: string = `${APP_CONSTANTS.apiPrefix}/seller`;
  public router: Router = Router();
  private fmt: Formatter = new Formatter();
  private sellerService: SellerService;

  constructor(sellerService: SellerService) {
    this.sellerService = sellerService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(SellerCreateDto, APP_CONSTANTS.body),
      handleRequest(this.createSeller)
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(SellerUpdateDto, APP_CONSTANTS.body),
      handleRequest(this.updateSeller)
    );
    this.router.get(
      `${this.path}`,
      addSearchParams,
      validationMiddleware(SearchParamsDto, APP_CONSTANTS.query),
      handleRequest(this.getAllSellers)
    );
    this.router.post(
      `${this.path}/:id/product`,
      validationMiddleware(ProductCreateDto, APP_CONSTANTS.body),
      handleRequest(this.createProduct)
    );
    this.router.put(
      `${this.path}/:id/product/:productId`,
      validationMiddleware(ProductUpdateDto, APP_CONSTANTS.body),
      handleRequest(this.updateProduct)
    );
    this.router.get(
      `${this.path}/:id/product`,
      addSearchParams,
      validationMiddleware(SearchParamsDto, APP_CONSTANTS.query),
      handleRequest(this.getAllProducts)
    );
  }

  /**
   * Create a seller
   *
   * @param sellerData sellerData
   * @returns Created seller data
   */
  private createSeller = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const sellerCreateDto: SellerCreateDto = request.body;
    const sellerDetail = await this.sellerService.createSeller(sellerCreateDto);
    response.send(
      this.fmt.formatResponse(
        sellerDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  /**
   * Update a seller
   *
   * @param seller seller
   * @returns updated seller data
   */
  private updateSeller = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const sellerId: string = request.params.id;
    const sellerUpdateDto: SellerUpdateDto = request.body;
    const sellerDetail = await this.sellerService.updateSeller(
      sellerId,
      sellerUpdateDto
    );
    response.send(
      this.fmt.formatResponse(
        sellerDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  /**
   * Get all seller's based on the given params.
   *
   * @param searchParams Search params
   * @returns
   */
  private getAllSellers = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const { data, total } = await this.sellerService.getAllSellers(
      request.searchParams
    );
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  };

  /**
   * Create a product
   *
   * @param productData productData
   * @returns Created product data
   */
  private createProduct = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const sellerId: string = request.params.id;
    const productCreateDto: ProductCreateDto = request.body;
    const productDetail = await this.sellerService.createProduct(
      sellerId,
      productCreateDto
    );
    response.send(
      this.fmt.formatResponse(
        productDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  /**
   * Update a product
   *
   * @param product product
   * @returns updated product data
   */
  private updateProduct = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const sellerId: string = request.params.id;
    const productId: string = request.params.productId;
    const productUpdateDto: ProductUpdateDto = request.body;
    const productDetail = await this.sellerService.updateProduct(
      sellerId,
      productId,
      productUpdateDto
    );
    response.send(
      this.fmt.formatResponse(
        productDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

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
    const sellerId: string = request.params.id;
    const { data, total } = await this.sellerService.getAllProducts(
      sellerId,
      request.searchParams
    );
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  };
}

export default SellerController;
