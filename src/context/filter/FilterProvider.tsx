import { useContext, useEffect, useReducer } from "react";
import { filterReducer } from "./FilterReducer";
import { IProduct } from "interfaces";
import { FilterContext } from "./FilterContext";
import productServices from "services/product.services";
import { ProductContext } from "context/product/ProductContext";

export interface FilterState {
  categories: string[];
}

export type FilterContextProps = {
  filterState: FilterState;
  categories : string[];
  getProductCategories:() => void;
  filterPorductsByPrice: (event: any) => void;
  filterProductsByCategory: (products: IProduct[], category: string) => void;
};

const INITIAL_STATE = {
  categories: []
};

interface props {
  children: JSX.Element;
}

export const FilterProductsProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);
  const { productsState, setProducts, getAll} = useContext(ProductContext);
  var products = productsState.products;

  const filterPorductsByPrice = (event: any) =>{
    let price = event.target.value;
    getAll();
    console.log(price);
    console.log("Ovde sam!!");
   if(products.length === 0) return;
    const filterByPrice = products.filter((product) => product.price >= price);
    productsState.products = filterByPrice;
    dispatch({ type: "GET_PRODUCTS_BY_PRICE", payload: filterByPrice });
    setProducts(filterByPrice)
    console.log(products);
    
  }

  const filterProductsByCategory = (products: IProduct[], category: string) =>{
    if(products.length === 0) return;
    const filterByCategory = products.filter((product) => product.category === category);
    products = filterByCategory;
    dispatch({ type: "GET_PRODUCTS_BY_CATEGORY", payload: filterByCategory });
  }

  const getProductCategories = () => {
    dispatch({type: "GET_ALL_PRODUCT_CATEGORIES"});
    try {
        productServices.getCategories()
         .then(function(response){ 
            state.categories = response.data;
            dispatch({ type: "SET_ALL_PRODUCT_CATEGORIES",payload: response.data});
          })
    } catch (error) {
      dispatch({ type: "SET_PRODUCTS_CATEGORIES_ERROR" });
    }
  };

  useEffect(() => {
    getProductCategories();
  }, []);


  return (
    <FilterContext.Provider
      value={{
        filterState: state,
        categories: state.categories,
        getProductCategories,
        filterPorductsByPrice,
        filterProductsByCategory
      }}
    >
      {children}
    </FilterContext.Provider>
  );

};

