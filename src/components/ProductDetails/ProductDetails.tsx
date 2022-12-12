import { useState, useEffect} from 'react'
import { IconButton } from "@material-ui/core";
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import productServices from "services/product.services";
import { IProduct } from 'interfaces';

const ProductDetails = (data: any) => {
  
 const [product, setProduct] = useState<IProduct | null>(null) 
 const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {
    getProductById(data.id);
  }, []); // eslint-disable-line

  const getProductById = (id : any) => {
   
    try {
      console.log("Javljam se iz odavde")
      setIsLoading(true)
        productServices.getById(id)
         .then(function(response){ 
            setProduct(response.data)
            setIsLoading(false)
          })
    } catch (error) {
      setIsLoading(false)
    }
  }
  if(isLoading) return <div>loading...</div>
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
