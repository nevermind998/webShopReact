import { useState, useEffect, useContext } from 'react'
import { Button, IconButton } from "@mui/material";
import styles from "./styles.module.css";
import productServices from "services/product.services";
import { ICartItem, IProduct } from 'interfaces';
import { WishlistContext } from 'context/wishlist/WishlistContext';
import { CartContext } from 'context/cart/CartContext';
import { CounterContext } from 'context/counter/CounterContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Loader from 'components/Loader';

export class CartItem implements ICartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;

  constructor(id: number, title: string, price: number, image: string, quantity: number) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
  }

}

const ProductDetails = (data: any) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItem, setCartItemState] = useState<CartItem>();
  const { counterState, addition, subtraction } = useContext(CounterContext);
  const { total } = counterState;
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    getProductById(data.id);
  }, []);

  const getProductById = (id: any) => {

    try {
      setIsLoading(true)
      productServices.getById(id)
        .then(function (response) {
          setProduct(response.data)
          let product = response.data;
          if (product != null) {
            let cartItem1 = new CartItem(product.id, product.title, product.price, product.image, 1);
            setCartItemState(cartItem1);
          }
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
    }
  }

  function addToWishlistFunction() {
    if (cartItem != null) {
      cartItem.quantity = total;
      addToWishlist(cartItem);
    }
  }

  function addItemToCart() {
    if (cartItem != null) {
      cartItem.quantity = total;
      addToCart(cartItem);
    }
  }

  function handleClickSubtraction() {
    subtraction();
    if (cartItem)
      updateQuantity(cartItem.id, "minus");
  }

  function handleClickAddition() {
    addition();
    if (cartItem)
      updateQuantity(cartItem.id, "plus");
  }

  if (isLoading) return <div><Loader/></div>
  return (
    <div>
      {product ?
        <div className={styles.product_overview} >
          <img className={styles.product_image} src={product.image} alt={product.title} />
          <div className={styles.details}>
            <p className={styles.product_title}>{product.title}</p>
            <p className={styles.rating}> Review : {product.rating.rate} ({product.rating.count} )</p>
            <p className={styles.product_price}>${product.price}</p>
            <p className={styles.description}>{product.description}</p>

            <Button onClick={handleClickSubtraction}>-</Button>{total}<Button onClick={handleClickAddition}>+</Button>
            <Button variant="outlined" onClick={addItemToCart}> Add to cart </Button>
            <IconButton color="primary" onClick={addToWishlistFunction}>
              <Button variant="outlined" >
                <FavoriteBorderIcon />
              </Button>
            </IconButton>

            <p className={styles.category}>Category: {product.category} </p>
          </div>
        </div> : <p />
      }
    </div>
  );
};

export default ProductDetails;
