import { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { ProductContext } from "context/product/ProductContext";
import ProductCard from "components/ProductCard/ProductCard";

const ProductOverview = () => {

  const {productsState, getAll} = useContext(ProductContext)    
  const { products } = productsState;
  
  useEffect(() => {
    getAll();
  }, []);

  return (
     
        <ul className={styles.imageGallery}>
          {products.map(product =>{
              return (
                <ProductCard
                   key={product.id}
                   {...product}
                />
              );
            })}
        </ul>
  );
};

export default ProductOverview;
