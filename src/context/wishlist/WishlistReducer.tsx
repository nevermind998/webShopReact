import { ICartItem } from "interfaces";
import { WishlistState } from "./WishlistProvider";

type WishlistAction =
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "ADD_TO_CART"; payload: ICartItem }

export const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {

  switch (action.type) {
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    
      
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};

