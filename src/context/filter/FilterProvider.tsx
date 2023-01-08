import { useContext, useReducer } from "react";
import { filterReducer } from "./FilterReducer";
import { IProduct } from "interfaces";
import { FilterContext } from "./FilterContext";
import productServices from "services/product.services";
import { ProductContext } from "context/product/ProductContext";
import { IActiveFilter } from "components/FilterSideBar/FilterSideBar";

export interface FilterState {
  categories: string[];
}

export type FilterContextProps = {
  filterState: FilterState;
  categories: string[];
  getProductCategories: () => void;
  filterProducts: (activeFilters: IActiveFilter[]) => void;
  sortingProduct: (event: any) => void;
  searchProduct: (searchBy: string) => void;
  clearSearch: () => void;
};

const INITIAL_STATE = {
  categories: []
};

interface props {
  children: JSX.Element;
}

export const FilterProductsProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);
  const { productsState, setProducts } = useContext(ProductContext);
  var products = productsState.products;

  const filterProducts = (activeFilters: IActiveFilter[]) => {
    let filter = activeFilters.find(filter => filter.filterBy === "priceRange");
    let price = filter?.active ? filter?.value : null;
    let exists = false;

    let activeCategoryFilters = activeFilters.filter(filter => filter.filterBy !== "priceRange")

    if (activeCategoryFilters.length != 0) {
      products.forEach((product: IProduct) => {
        if (activeCategoryFilters.length != 0) exists = activeCategoryFilters.some(category => (product.category === category.filterBy));
        else exists = false;
        if ((price == null || product.price >= price) && exists) product.visible = true;
        else product.visible = false;
      });
    }
    else {
      products.forEach((product: IProduct) => {
        if ((price != null && product.price >= price)) product.visible = true;
        else product.visible = false;
      });
    }

    dispatch({ type: "GET_PRODUCTS_BY_FILTER" });
    setProducts(products);
  }

  const sortingProduct = (event: any) => {
    let option = event.target.value;
    let products = productsState.products;
    let visibleProducts = products.filter(product => product.visible);
    if (option === 'ascPrice') visibleProducts.sort((a, b) =>
      a.price < b.price ? -1 : 1
    );
    if (option === 'dscPrice') visibleProducts.sort((a, b) =>
      a.price > b.price ? -1 : 1
    );
    if (option === 'ascTitle') visibleProducts.sort((a, b) =>
      a.title < b.title ? -1 : 1
    );
    if (option === 'dscTitle') visibleProducts.sort((a, b) =>
      a.title > b.title ? -1 : 1
    );

    setProducts(visibleProducts);
  }

  const searchProduct = (searchBy: string) => {
    let products = productsState.allProducts;
    let searchedProducts = products.filter(product => product.title.toLowerCase().startsWith(searchBy.toLowerCase()));
    searchedProducts.map(product => product.visible = true);
    setProducts(searchedProducts);
  }

  const clearSearch = () => {
    setProducts(productsState.allProducts);
  }

  const getProductCategories = () => {
    dispatch({ type: "GET_ALL_PRODUCT_CATEGORIES" });
    try {
      productServices.getCategories()
        .then(function (response) {
          let categories = response.data;
          dispatch({ type: "SET_ALL_PRODUCT_CATEGORIES", payload: categories });
        })
    } catch (error) {
      dispatch({ type: "SET_PRODUCTS_CATEGORIES_ERROR" });
    }
  };


  return (
    <FilterContext.Provider
      value={{
        filterState: state,
        categories: state.categories,
        getProductCategories,
        filterProducts,
        sortingProduct,
        searchProduct,
        clearSearch
      }}
    >
      {children}
    </FilterContext.Provider>
  );

};

