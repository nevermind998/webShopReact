import { FilterContext } from "context/filter/FilterContext";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Slider from '@mui/material/Slider';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { ProductContext } from "context/product/ProductContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


export interface IActiveFilter {
  filterBy: string | undefined;
  value: number | undefined;
  active: boolean | undefined;
}

export class ActiveFilter implements IActiveFilter {
  filterBy: string | undefined;
  value: number | undefined;
  active: boolean | undefined;
}

const FilterSideBar = () => {
  const { getProductCategories, categories, filterProducts, sortingProduct, searchProduct, clearSearch } = useContext(FilterContext);
  const [activeFilters, setActiveFilters] = useState<IActiveFilter[]>([]);
  const [filterSet, setFilter] = useState<boolean>(false);
  const { productsState, setProducts } = useContext(ProductContext);
  const [items, setItems] = useState<any[]>([]);
  const [checkItems, setCheckItmes] = useState<boolean>(false);
  var products = productsState.allProducts;

  useEffect(() => {
    getProductCategories();
  }, [])

  useEffect(() => {
    if (categories.length != 0) {
      setFilters()
    }

    if (products.length != 0) {
      setItemsFunction();
    }
  }, [categories, products])

  function setFilters() {
    let activeFilter = new ActiveFilter();
    let listOfActiveFilter = [];
    activeFilter.filterBy = "priceRange";
    activeFilter.value = 0;
    activeFilter.active = true;
    listOfActiveFilter.push(activeFilter);

    categories.map(category => {
      let activeFilter = new ActiveFilter();
      activeFilter.filterBy = category;
      activeFilter.active = false;
      listOfActiveFilter.push(activeFilter);
    });

    setActiveFilters(listOfActiveFilter);
    setFilter(true);
  }

  function setItemsFunction() {
    let arrayOfItems: any[] = [];
    products.map(product => {
      let item = {
        id: product.id,
        name: product.title
      }
      arrayOfItems.push(item);
    });

    setItems(arrayOfItems);
    setCheckItmes(true);
  }

  function filterChangeByPriceRange(event: any) {
    if (!filterSet) setFilters();

    activeFilters.map(activeFilter => {
      if (activeFilter.filterBy === "priceRange") {
        activeFilter.value = event.target.value;
        activeFilter.active = true;
      }
    });

    let filters = activeFilters.filter(filter => filter.active);
    filterProducts(filters);
  }

  function filterChangeByCategory(event: any) {
    let category = event.target.value;

    if (!filterSet) setFilters();

    activeFilters.map(activeFilter => {
      if (activeFilter.filterBy === category) {
        activeFilter.value = event.target.value;
        activeFilter.active = event.target.checked;
      }
    });

    let filters = activeFilters.filter(filter => filter.active);
    filterProducts(filters);
  }

  function clearFilter(){
    let products = productsState.allProducts;
    products.map(product => product.visible = true)
    setProducts(products);
  }

  const handleOnSearch = (searchBy: string, result: any) => {
    if (!checkItems) setItemsFunction();
    result = [];
    let suggestions = items.filter((item) =>
      item.name.toLowerCase().startsWith(searchBy.toLowerCase()
      ));

    suggestions.map(item => result.push(item.name));
  }

  const handleOnSelect = (item: any) => {
    searchProduct(item.name);
    console.log(item)
  }

  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: 'inline-block !important', textAlign: 'left'}}>{item.name}</span>
      </>
    )
  }

  return (
    <div className={styles.filterSideBar}>

      <Button
      onClick={clearFilter}
      variant="outlined" size="small"
      className={styles.button}
      >
        Clear all filters
      </Button>
      <div>
        <label>Sort by
          <select onChange={(e) => sortingProduct(e)}>
            <option value='none'></option>
            <option value='ascPrice'>Sort by price: low to high</option>
            <option value='dscPrice'>Sort by price: hight to low</option>
            <option value='ascTitle'>Sort by title: ascending  </option>
            <option value='dscTitle'>Sort by title: descending </option>
          </select>
        </label>

        <p>Filter by price</p>
        <Slider
          defaultValue={30}
          onChange={e => filterChangeByPriceRange(e)}
          step={10}
          marks
          min={0}
          max={150}
          className={styles.slider}
        />

        <div className={styles.search}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onClear={clearSearch}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </div>

      <p>Product Categories</p>
      {categories.map(category =>
        <div className={styles.productCategories} key={category}>
          <input
            type="checkbox"
            id={category}
            name={category}
            value={category}
            onClick={e => filterChangeByCategory(e)}
          />
          <label className={styles.productCategoriesLabel}>{category}</label>
        </div>
      )}

    </div>
  );
};

export default FilterSideBar;
