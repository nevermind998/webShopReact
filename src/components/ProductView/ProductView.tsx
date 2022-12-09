import { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import Product from "components/Product/Product";
import { ProductContext } from "context/product/ProductContext";

const ProductView = () => {

  const {productsState, getAll} = useContext(ProductContext)    
  const { products } = productsState;
  
  useEffect(() => {
    getAll();
  }, []);
  
  return (
     
        <ul className={styles.imageGallery}>
          {products.map(product =>{
              return (
                <Product
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

export default ProductView;
