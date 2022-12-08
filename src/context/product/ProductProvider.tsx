import { useEffect, useReducer } from "react";
import { productReducer } from "./ProductReducer";
import { IProduct } from "interfaces";
import productServices from "services/product.services";
import { ProductContext } from "./ProductContext";

export interface ProductState {
  products: IProduct[];
}

export type ProductContextProps = {
  productsState: ProductState;
  setProducts: (products : IProduct[]) => void;
  getAll: () => void;
};

const INITIAL_STATE = {
  products: []
};


interface props {
  children: JSX.Element;
}

export const ProductsProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

  const setProducts = (products : IProduct[]) => {
    state.products = products; 
    dispatch({type: "SET_PRODUCTS_DATA", payload:products});
  }

  const getAll = () => {
    dispatch({type: "GET_ALL_PRODUCTS_DATA"});
    try {
        productServices.getAll()
         .then(function(response){ 
            dispatch({ type: "SET_PRODUCTS_DATA",payload: response.data});
          })
    } catch (error) {
      dispatch({ type: "SET_PRODUCTS_DATA_ERROR" });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productsState: state,
        getAll,
        setProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );

};

