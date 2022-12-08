import { IProduct } from "interfaces";
import styles from "./styles.module.css";

const Product = ({
   id,
   title,
   price,
   description,
   category,
   image,
   rating,
}: IProduct) => {

  function truncatTitle(title : string, length : number) : string{
    return title.substring(0, Math.min(length,title.length))+"...";
  }
  
  return (
     <li className={styles.product_overview}  key={id.toString()}>
      <img className={styles.product_image} src={image} alt={title} />
        <p className={styles.product_title}>{truncatTitle(title,40)}</p>
        <p className={styles.product_price}>${price}</p>
      </li>
  );
};

export default Product;
