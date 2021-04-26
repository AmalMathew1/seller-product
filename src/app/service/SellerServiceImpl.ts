import { DeepPartial, getCustomRepository } from "typeorm";
import logger from "../config/logger";
import { ProductCreateDto } from "../dto/ProductCreateDto";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { SellerCreateDto } from "../dto/SellerCreateDto";
import { SellerUpdateDto } from "../dto/SellerUpdateDto";
import { Product } from "../entity/Product";
import { Seller } from "../entity/Seller";
import ProductRepositoryImpl from "../repository/ProductRepositoryImpl";
import SellerRepositoryImpl from "../repository/SellerRepositoryImpl";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";
import { SellerService } from "./SellerService";

class SellerServiceImpl implements SellerService {

  /**
   * Get custom Seller repository
   *
   */
  public getSellerRepository = () => {
    return getCustomRepository(SellerRepositoryImpl);
  };

  /**
   * Get custom Seller repository
   *
   */
   public getProductRepository = () => {
    return getCustomRepository(ProductRepositoryImpl);
  };

  /**
   * Create a seller
   *
   * @param sellerData sellerData
   * @returns Created seller data
   */
  public createSeller = async (seller: SellerCreateDto): Promise<Seller> => {
    logger.info(`Create seller with payload ${JSON.stringify(seller)}`);
    const sellerPayload: DeepPartial<Seller> = seller;
    return await this.getSellerRepository().createSeller(sellerPayload);
  };

  /**
   * Update a seller
   *
   * @param seller seller
   * @returns updated seller data
   */
  public updateSeller = async (
    sellerId: string,
    payload: SellerUpdateDto
  ): Promise<Seller> => {
    logger.info(
      `Update seller with id ${sellerId} payload ${JSON.stringify(payload)}`
    );
    return await this.getSellerRepository().updateSeller(sellerId, payload);
  };

  /**
   * Get all seller's based on the given params.
   *
   * @param searchParams Search params
   * @returns
   */
  public getAllSellers = async (
    searchParams: URLParams
  ): Promise<SearchResult> => {
    logger.info(`Get seller with searchParams ${JSON.stringify(searchParams)}`);
    return await this.getSellerRepository().getAllSellers(searchParams);
  };

  /**
   * Create a product
   *
   * @param productData productData
   * @returns Created product data
   */
   public createProduct = async (sellerId: string, product: ProductCreateDto): Promise<Product> => {
    logger.info(`Create product for sellerId ${sellerId} with payload ${JSON.stringify(product)}`);
    const searchParams: URLParams = {"id": sellerId};
    const result: SearchResult = await this.getAllSellers(searchParams);
    const seller: Seller = result.data[0];
    const productPayload: DeepPartial<Product> = product;
    productPayload.seller = seller;
    logger.info(`Create product productPayload ${JSON.stringify(productPayload)}`);
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
      `Update product for sellerId ${sellerId} with product id ${productId} payload ${JSON.stringify(payload)}`
    );
    const searchParams: URLParams = {"id": sellerId};
    await this.getAllSellers(searchParams);
    return await this.getProductRepository().updateProduct(productId, payload);
  };

  /**
   * Get all product's based on the given params.
   *
   * @param searchParams Search params
   * @returns
   */
   public getAllProducts = async (
    sellerId: string,
    searchParams: URLParams
  ): Promise<SearchResult> => {
    logger.info(`Get product for sellerId ${sellerId} with searchParams ${JSON.stringify(searchParams)}`);
    const sellerSearchParams: URLParams = {"id": sellerId};
    await this.getAllSellers(sellerSearchParams);
    return await this.getProductRepository().getAllProducts(searchParams, sellerId);
  };

}

export default SellerServiceImpl;
