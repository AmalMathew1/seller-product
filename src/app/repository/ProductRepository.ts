import { DeepPartial } from "typeorm";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { Product } from "../entity/Product";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";

export interface ProductRepository {
  /**
   * Create a product with the given payload
   */
  createProduct(seller: DeepPartial<Product>): Promise<Product>;

  /**
   * Update a product with the given payload
   */
  updateProduct(sellerId: string, payload: ProductUpdateDto): Promise<Product>;

  /**
   * Get all product's based on the given params.
   */
  getAllProducts(searchParams: URLParams): Promise<SearchResult>;
}
