import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ProductContext } from "context/product/ProductContext";
import ProductCard from "components/ProductCard/ProductCard";
import LoaderProducts from "components/LoaderProducts";

const ProductOverview = () => {

  const { productsState, getAll } = useContext(ProductContext)
  const { products } = productsState;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false),900);
  }, []);

  if (isLoading) return <div><LoaderProducts /></div>

  return (
    <ul className={styles.imageGallery}>
      {
        products.filter(product => product.visible)
          .map(product => {
            return (
              <ProductCard
                key={product.id}
                {...product}
              />
            );
          })
      }
    </ul>
  );
};

export default ProductOverview;
