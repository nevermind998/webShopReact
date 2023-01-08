import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import SvgIcon from "components/SvgIcon";
import { CartContext } from "context/cart/CartContext";

const CarBadge = () => {
  const {cartState}= useContext(CartContext);

  return (
    <Link to={"/cart"}>
      <span className={styles.cart_badge}>
        <SvgIcon type="cart" className={styles.cart_icon} />
        <span className={styles.cart_items_number}>{cartState.items.length}</span>
      </span>
    </Link>
  );
};

export default memo(CarBadge);
