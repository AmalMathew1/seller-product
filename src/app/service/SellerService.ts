import { ProductCreateDto } from "../dto/ProductCreateDto";
import { ProductUpdateDto } from "../dto/ProductUpdateDto";
import { SellerCreateDto } from "../dto/SellerCreateDto";
import { SellerUpdateDto } from "../dto/SellerUpdateDto";
import { Product } from "../entity/Product";
import { Seller } from "../entity/Seller";
import SearchResult from "../util/rest/searchResult";
import URLParams from "../util/rest/urlparams";

export interface SellerService {
  /**
   * Create a seller with the given payload
   */
  createSeller(seller: SellerCreateDto): Promise<Seller>;

  /**
   * Update a seller with the given payload
   */
  updateSeller(sellerId: string, payload: SellerUpdateDto): Promise<Seller>;

  /**
   * Get all seller's based on the given params.
   */
  getAllSellers(searchParams: URLParams): Promise<SearchResult>;

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
   getAllProducts(sellerId: string, searchParams: URLParams): Promise<SearchResult>;
}
