
import { CartContext } from "context/cart/CartContext";
import React, { memo, useContext } from "react";
import styles from "./styles.module.css";

const CartTotals = () => {
  const { cartState } = useContext(CartContext);
  return (
    <div className={styles.cartTotal}>
      <div className={styles.cart_content}>
        <h4>Cart totals</h4>
        <table>
          <thead>
            <tr>
              <th className={styles.subtotal_title}>SUBTOTAL</th>
              <th>${cartState.amount}</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            <tr>
              <td className={styles.title_head}>Shipping</td>
              <td className={styles.table_value}></td>
            </tr>
            <tr>
              <td className={styles.title_head}>Flat rate:</td>
              <td className={styles.table_value}>$2.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table>
        <tfoot>
          <tr>
            <th className={styles.title_head}>TOTAL</th>
            <th>${cartState.amount+2}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default memo(CartTotals);
