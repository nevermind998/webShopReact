import { FilterState } from "./FilterProvider";
import { IProduct } from "interfaces";

type ProductAction =
  | { type: "GET_PRODUCTS_BY_PRICE"; payload: IProduct[] }
  | { type: "GET_PRODUCTS_BY_CATEGORY"; payload: IProduct[] }
  | { type: "GET_ALL_PRODUCT_CATEGORIES"; }
  | { type: "SET_PRODUCTS_CATEGORIES_ERROR"; }
  | { type: "SET_ALL_PRODUCT_CATEGORIES"; payload: string[] }

export const filterReducer = (
  state: FilterState,
  action: ProductAction
): FilterState => {

  switch (action.type) {
    case "GET_PRODUCTS_BY_PRICE":
      return {
        ...state
      };

    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state
      };

    case "GET_ALL_PRODUCT_CATEGORIES":
      return {
        ...state
      };

    case "SET_ALL_PRODUCT_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      };

    case "SET_PRODUCTS_CATEGORIES_ERROR":
      return {
        ...state
      };



    default:
      return state;
  }
};

