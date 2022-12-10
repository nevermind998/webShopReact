import { IconButton } from "@material-ui/core";
import { Button } from "@mui/material";
import { ProductContext } from "context/product/ProductContext";
import { useEffect, useContext } from "react";
import styles from "./styles.module.css";

const ProductDetails = (data: any) => {
  const { getProductById, productsState } = useContext(ProductContext)  
  const product = productsState.product;

  useEffect(() => {
    getProductById(data.id);
    console.log("Id je"); 
  }, []);

  return (
    <div>
      { product ? 
        <div className={styles.product_overview} >
          <img className={styles.product_image} src={product.image} alt={product.title} />
          <div className={styles.details}>
            <p className={styles.product_title}>{product.title}</p>
            <p className={styles.rating}> Review : {product.rating.rate} ({product.rating.count} )</p>
            <p className={styles.product_price}>${product.price}</p>
            <p className={styles.description}>{product.description}</p>
  
            <Button variant="contained" >
              Add to cart
            </Button>
            <p></p>
            <Button variant="contained" >
              Add to wishlist
            </Button>

            <p className={styles.category}>Category: {product.category} </p> 

            </div>
          </div> : <p/>

      }
      </div>

  );
};

export default ProductDetails;
