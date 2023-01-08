import { useReducer } from "react";
import { productReducer } from "./ProductReducer";
import { IProduct } from "interfaces";
import productServices from "services/product.services";
import { ProductContext } from "./ProductContext";

export interface ProductState {
  products: IProduct[];
  allProducts: IProduct[];
  product: any;
}

export type ProductContextProps = {
  productsState: ProductState;
  setProducts: (products : IProduct[]) => void;
  getAll: () => void;
  getProductById: (id : any) => void;
};

const INITIAL_STATE = {
  products: [],
  allProducts: [],
  product: null
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
            let products = response.data;

            products.map((product : IProduct) => {
              product.visible = true;
            });
            
            state.allProducts = products;
            dispatch({ type: "SET_PRODUCTS_DATA",payload: products});
            dispatch({ type: "SET_ALL_PRODUCTS_DATA",payload: products});
          })
    } catch (error) {
      dispatch({ type: "SET_PRODUCTS_DATA_ERROR" });
    }
  };

  const getProductById = (id : any) => {
    dispatch({type: "GET_PRODUCT_BY_ID"});
    try {
        productServices.getById(id)
         .then(function(response){ 
            dispatch({ type: "SET_PRODUCT",payload: response.data});
          })
    } catch (error) {
      dispatch({ type: "SET_PRODUCT_DATA_ERROR" });
    }
  }

  return (
    <ProductContext.Provider
      value={{
        productsState: state,
        getAll,
        setProducts,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );

};

