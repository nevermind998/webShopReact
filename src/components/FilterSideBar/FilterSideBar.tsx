import { FilterContext } from "context/filter/FilterContext";
import { useContext } from "react";
import styles from "./styles.module.css";
import Slider from '@mui/material/Slider';

const FilterSideBar = () => {

  const { filterState, categories, filterPorductsByPrice, filterProductsByCategory } = useContext(FilterContext);


  return (
    <div className={styles.filterSideBar}>

      <div>
        <p>Filter by price</p>
        <Slider
           defaultValue={30}
           onChange={e => filterPorductsByPrice(e)}
           step={10}
           marks
           min={0}
           max={150}
        />    
      </div>

      <p>Product Categories</p>
      {categories.map(category =>
        <div className={styles.productCategories}>
          <input type="checkbox" id={category} name={category} value={category} />
          <label className={styles.productCategoriesLabel}>{category}</label>
        </div>
      )}

    </div>
  );
};

export default FilterSideBar;
