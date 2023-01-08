import { Box, Button, TextField } from "@mui/material";
import { AppLayout } from "components/Layouts";
import { CartContext } from "context/cart/CartContext";
import CartView from "pages/cart/CartView";
import { useContext, useState } from "react";
import CartItem from "../CartItem";
import styles from "./styles.module.css";

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country:'',
        streetAddress: '',
        town: '',
        zipCode:'',
        phone:'',
        message: ''
      });

      const { cartState, removeCartItem } = useContext(CartContext);
    
      const handleChange = (event: any) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }
    
      const handleSubmit = (event: any) => {
      }
    
      return (
        <AppLayout>
        <div  className={styles.checkoutForm}>
        <div className={styles.cloumn} >
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '420px' },
            }}
            noValidate
            autoComplete="off"
        >
        <div>
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="First name" variant="outlined" >
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <TextField id="outlined-basic" label="Last name" variant="outlined" >
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <TextField id="outlined-basic" label="Country" variant="outlined" >
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <TextField id="outlined-basic" label="Town" variant="outlined" >
          <input
            type="text"
            id="town"
            name="town"
            value={formData.town}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <TextField id="outlined-basic" label="Zip code" variant="outlined" >
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <TextField id="outlined-basic" label="Street address" variant="outlined" >
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <TextField id="outlined-basic" label="Phone" variant="outlined" >
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          </TextField>
          <br />

          <TextField id="outlined-basic" label="Email" variant="outlined" >
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          </TextField>
          <br />
          <br />
          <Button variant="contained">Place your order</Button>
        </form>
        </div>
        </Box>
        </div>

        <div className={styles.column}>
        <div className={styles.cartItems}>
        <p>Your order</p>
          {cartState.items
            .map((item) => ({ ...item, quantity:item.quantity}))
            .map((item) => {
              return (
                <CartItem
                  key={item.id}
                  {...item}
                  removeHandler={removeCartItem}
                />
              );
            })}

            <p>TOTAL: <span style={{float:'right'}}>${Math.fround((cartState.amount+2.50)*100)/100}</span></p>
        </div>
        </div>
        </div>
        </AppLayout>
      );
};

export default CheckoutForm;
