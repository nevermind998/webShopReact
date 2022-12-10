import { ProductState } from "./ProductProvider";
import { IProduct } from "interfaces";

type ProductAction =
  | { type: "GET_ALL_PRODUCTS_DATA"; }
  | { type: "SET_PRODUCTS_DATA"; payload: IProduct[] }
  | { type: "SET_PRODUCTS_DATA_ERROR"; }
  | { type: "GET_PRODUCT_BY_ID"; }
  | { type: "SET_PRODUCT"; payload: IProduct}
  | { type: "SET_PRODUCT_DATA_ERROR"; }


export const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {

  switch (action.type) {
    case "GET_ALL_PRODUCTS_DATA":
      return {
        ...state
      };

    case "SET_PRODUCTS_DATA":
      return {
        ...state,
        products: action.payload
      };

    case "SET_PRODUCTS_DATA_ERROR":
      return {
        ...state
      };

    case "GET_PRODUCT_BY_ID":
      return {
        ...state
      };

    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload
      };

    case "SET_PRODUCT_DATA_ERROR":
      return {
        ...state
      };

    default:
      return state;
  }
};

