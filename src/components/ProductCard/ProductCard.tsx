import { IProduct } from "interfaces";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const ProductCard = ({
   id,
   title,
   price,
   description,
   category,
   image,
   rating,
}: IProduct) => {
  
  function truncatTitle(
    title : string, length : number) : string{
    return title.substring(0, Math.min(length,title.length))+"...";
  }

  return (
    <Link to={`./ProductPage/${id}`} className={styles.product_overview} >
     <li key={id.toString()} >
      <img className={styles.product_image} src={image} alt={title} />
        <p className={styles.product_title}>{truncatTitle(title,40)}</p>
        <p className={styles.product_price}>${price}</p>
      </li>
   </Link>
  );
};

export default ProductCard;
