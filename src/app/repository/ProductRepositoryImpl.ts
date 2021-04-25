import {
  DeepPartial,
  EntityRepository,
  getManager,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import logger from "../config/logger";
import { ProductFilterDto } from "../dto/ProductFilterDto";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { Product } from "../entity/Product";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";
import { ProductRepository } from "./ProductRepository";
/**
 * Handles CRUD operations on Product data in database
 **/
@EntityRepository(Product)
class ProductRepositoryImpl implements ProductRepository {
  /**
   * Create a Product
   *
   * @param productData Product Data
   * @returns Created Product data
   */
  public createProduct = async (
    product: DeepPartial<Product>
  ): Promise<Product> => {
    const productRepo: Repository<Product> = getManager().getRepository(Product);
    const productDetail = await productRepo.save(product);
    return productDetail;
  };

 /**
   * Update a product
   *
   * @param product product
   * @returns updated product data
   */
  public updateProduct = async (
    productId: string,
    payload: ProductUpdateDto
  ): Promise<Product> => {
    const productRepo: Repository<Product> = getManager().getRepository(Product);
    const qb = productRepo
      .createQueryBuilder("product")
      .where("product.id = :id", { id: productId });
    const prodDetail = await qb.getOne();
    if (!prodDetail) {
      logger.error(`Product with ID ${productId} not found`);
      throw new EntityNotFoundException(ErrorCodes.PRODUCT_WITH_ID_NOT_FOUND);
    }
    await productRepo.update(productId, payload);
    return await productRepo.findOne(productId);
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
    const productRepo: Repository<Product> = getManager().getRepository(Product);
    const queryBuilder = productRepo.createQueryBuilder("product");
    queryBuilder.leftJoinAndSelect("product.seller", "seller");
    this.addQueryfilters(queryBuilder, searchParams, sellerId);
    const sort = searchParams.sort || "createdAt";
    const limit = searchParams.limit;
    const records = await queryBuilder
      .orderBy(`product.${sort}`, searchParams.order)
      .skip(searchParams.offset)
      .take(limit)
      .getMany();
    return {
      data: records,
      length: records.length,
      total: records.length,
    };
  };

  private addQueryfilters(
    queryBuilder: SelectQueryBuilder<Product>,
    searchParams: URLParams,
    sellerId: string
  ): void {
    if(sellerId){
      queryBuilder.andWhere("seller.id = :id", { id: sellerId })
    }
    const filters: ProductFilterDto = searchParams as ProductFilterDto;
    if (filters.id) {
      queryBuilder.andWhere("id = :id", { id: filters.id });
    }
    if (filters.createdAtStart) {
      queryBuilder.andWhere(
        "CAST(user.createdAt AS timestamp with time zone)>=:createdAtStart",
        { createdAtStart: filters.createdAtStart }
      );
    }
    if (filters.createdAtEnd) {
      queryBuilder.andWhere(
        "CAST(user.createdAt AS timestamp with time zone)<=:createdAtEnd",
        { createdAtEnd: filters.createdAtEnd }
      );
    }
  }
}

export default ProductRepositoryImpl;
