import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCart, editCartDetails } from '../store/cart';
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const emptyOrder = {
  cardName: '',
  cardNumber: '',
  expDate: '',
  cvv: '',
};

export default function PaymentForm() {
  const userAuth = useSelector((state) => state.auth);
  const userId = userAuth.id;

  let cart = useSelector((state) => state.cart);

  if (!cart.animals) {
    cart = emptyOrder;
  }

  const [order, setOrder] = useState(cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  useEffect(() => {
    setOrder(cart);
  }, [cart]);

  const handleChange = (evt) => {
    setOrder({ ...order, [evt.target.id]: evt.target.value });
    dispatch(editCartDetails(userId, { [evt.target.id]: evt.target.value }));
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cardName'
            label='Name on card'
            fullWidth
            autoComplete='cc-name'
            variant='standard'
            value={order.cardName}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cardNumber'
            label='Card number'
            fullWidth
            autoComplete='cc-number'
            variant='standard'
            value={order.cardNumber}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='expDate'
            label='Expiration date'
            fullWidth
            autoComplete='cc-exp'
            variant='standard'
            value={order.expDate}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cvv'
            label='CVV'
            helperText='Last three digits on signature strip'
            fullWidth
            autoComplete='cc-csc'
            variant='standard'
            value={order.cvv}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color='secondary' name='saveCard' value='yes' />}
            label='Remember credit card details for next time'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
