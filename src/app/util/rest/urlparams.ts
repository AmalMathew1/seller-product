import { SortOrder } from "../../constants/SortOrder";

/**
 * Used for filtering and paging results
 */
export default interface URLParams {
  limit?: number;
  offset?: number;
  sort?: string;
  order?: SortOrder;
  [key: string]: any;
}
