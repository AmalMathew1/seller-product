import {
  DeepPartial,
  EntityRepository,
  getManager,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import logger from "../config/logger";
import { SellerFilterDto } from "../dto/SellerFilterDto";
import { SellerUpdateDto } from "../dto/SellerUpdateDto";
import { Seller } from "../entity/Seller";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";
import { SellerRepository } from "./SellerRepository";
/**
 * Handles CRUD operations on Seller data in database
 **/
@EntityRepository(Seller)
class SellerRepositoryImpl implements SellerRepository {
  /**
   * Create a seller
   *
   * @param sellerData sellerData
   * @returns Created seller data
   */
  public createSeller = async (
    seller: DeepPartial<Seller>
  ): Promise<Seller> => {
    const sellerRepo: Repository<Seller> = getManager().getRepository(Seller);
    const sellerDetail = await sellerRepo.save(seller);
    return sellerDetail;
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
    const sellerRepo: Repository<Seller> = getManager().getRepository(Seller);
    const qb = sellerRepo
      .createQueryBuilder("seller")
      .where("seller.id = :id", { id: sellerId });
    const prodDetail = await qb.getOne();
    if (!prodDetail) {
      logger.error(`Seller with ID ${sellerId} not found`);
      throw new EntityNotFoundException(ErrorCodes.SELLER_WITH_ID_NOT_FOUND);
    }
    await sellerRepo.update(sellerId, payload);
    return await sellerRepo.findOne(sellerId);
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
    const sellerRepo: Repository<Seller> = getManager().getRepository(Seller);
    const queryBuilder = sellerRepo.createQueryBuilder("seller");
    this.addQueryfilters(queryBuilder, searchParams);
    const sort = searchParams.sort || "createdAt";
    const limit = searchParams.limit;
    const records = await queryBuilder
      .orderBy(`seller.${sort}`, searchParams.order)
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
    queryBuilder: SelectQueryBuilder<Seller>,
    searchParams: URLParams
  ): void {
    const filters: SellerFilterDto = searchParams as SellerFilterDto;
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

export default SellerRepositoryImpl;
