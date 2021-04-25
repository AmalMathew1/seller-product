import { ProductCreateDto } from "../dto/ProductCreateDto";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { Product } from "../entity/Product";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";

export interface ProductService {
  /**
   * Create a product with the given payload
   */
  createProduct(sellerId: string, product: ProductCreateDto): Promise<Product>;

  /**
   * Update a product with the given payload
   */
  updateProduct(sellerId: string, productId: string, payload: ProductUpdateDto): Promise<Product>;

  /**
   * Get all product's based on the given params.
   */
  getAllProducts(searchParams: URLParams, sellerId?: string, ): Promise<SearchResult>;
}
