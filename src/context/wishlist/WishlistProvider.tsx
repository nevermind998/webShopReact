import { useReducer } from "react";
import { WishlistContext } from "./WishlistContext";
import { wishlistReducer } from "./WishlistReducer";
import { ICartItem } from "interfaces";

export interface WishlistState {
  items: ICartItem[];
}

export type WishlistContextProps = {
  wishlistState: WishlistState;
  addToWishlist: (item: ICartItem) => void;
  removeCartItem: (id: number) => void;
};

const INITIAL_STATE: WishlistState = {
  items: []
};

interface props {
  children: JSX.Element;
}

export const WishlistProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(wishlistReducer, INITIAL_STATE);

  const addToWishlist = (item: ICartItem) => {
    const product = state.items.find((pr) => pr.id === item.id);
    if (product) return false;

   dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: item.quantity },
    });
    //updateAmount();
  };

  const removeCartItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
   // updateAmount();
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlistState: state,
        addToWishlist,
        removeCartItem
      }}
    >
      {children}
    </WishlistContext.Provider>
  );

};

