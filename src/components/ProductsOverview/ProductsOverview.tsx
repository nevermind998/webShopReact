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
                id={product.id} 
                title={product.title} 
                price={product.price}
                description={product.description} 
                category={product.category} 
                image={product.image}
                rating={{
                      rate: product.rating.rate,
                      count: product.rating.count
                  }} />
              );
            })}
        </ul>
  );
};

export default ProductOverview;
