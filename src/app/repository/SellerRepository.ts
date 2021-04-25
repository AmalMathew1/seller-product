import { DeepPartial } from "typeorm";
import { SellerUpdateDto } from "../dto/SellerUpdateDto";
import { Seller } from "../entity/Seller";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";

export interface SellerRepository {
  /**
   * Create a seller with the given payload
   */
  createSeller(seller: DeepPartial<Seller>): Promise<Seller>;

  /**
   * Update a seller with the given payload
   */
  updateSeller(sellerId: string, payload: SellerUpdateDto): Promise<Seller>;

  /**
   * Get all seller's based on the given params.
   */
  getAllSellers(searchParams: URLParams): Promise<SearchResult>;
}
