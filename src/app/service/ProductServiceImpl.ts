import { DeepPartial, getCustomRepository } from "typeorm";
import logger from "../config/logger";
import { ProductCreateDto } from "../dto/ProductCreateDto";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { Product } from "../entity/Product";
import ProductRepositoryImpl from "../repository/ProductRepositoryImpl";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";
import { ProductService } from "./ProductService";

class ProductServiceImpl implements ProductService {
  /**
   * Get custom Product repository
   *
   */
  public getProductRepository = () => {
    return getCustomRepository(ProductRepositoryImpl);
  };
  /**
   * Create a product
   *
   * @param productData productData
   * @returns Created product data
   */
  public createProduct = async (sellerId: string, product: ProductCreateDto): Promise<Product> => {
    logger.info(`Create product with payload ${product}`);
    const productPayload: DeepPartial<Product> = product;
    productPayload.seller.id = sellerId;
    return await this.getProductRepository().createProduct(productPayload);
  };

  /**
   * Update a product
   *
   * @param product product
   * @returns updated product data
   */
  public updateProduct = async (
    sellerId: string, 
    productId: string,
    payload: ProductUpdateDto
  ): Promise<Product> => {
    logger.info(
      `Update product with id ${productId} payload ${JSON.stringify(payload)}`
    );
    return await this.getProductRepository().updateProduct(productId, payload);
  };

  /**
   * Get all product's based on the given params.
   *
   * @param searchParams Search params
   * @returns
   */
  public getAllProducts = async (
    searchParams: URLParams,
    sellerId?: string
  ): Promise<SearchResult> => {
    logger.info(`Get product with searchParams ${JSON.stringify(searchParams)}`);
    return await this.getProductRepository().getAllProducts(searchParams);
  };
}

export default ProductServiceImpl;
