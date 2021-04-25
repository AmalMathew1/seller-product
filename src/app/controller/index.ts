/**
 * Wraps Controllers for easy import from other modules
 */
import ProductServiceImpl from "../service/ProductServiceImpl";
import SellerServiceImpl from "../service/SellerServiceImpl";
import HealthController from "./HealthController";
import ProductController from "./ProductController";
import SellerController from "./SellerController";

const sellerSevice = new SellerServiceImpl();
const productSevice = new ProductServiceImpl();
export default [
  new HealthController(),
  new SellerController(sellerSevice),
  new ProductController(productSevice),
];
