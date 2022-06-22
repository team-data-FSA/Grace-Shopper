import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCart, editCartDetails } from '../store/cart';

import {
  FormControlLabel,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Button,
} from '@material-ui/core';

const emptyOrder = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  zip: '',
};

export default function AddressForm({ setSubmit }) {
  const userAuth = useSelector((state) => state.auth);
  const userId = userAuth.id;

  let cart = useSelector((state) => state.cart);

  const [order, setOrder] = useState(emptyOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  useEffect(() => {
    let newCart = { ...cart };
    Object.keys(cart).forEach((key) => {
      if (newCart[key] === null) {
        newCart[key] = '';
      }
    });
    if (cart.firstName !== undefined) {
      setOrder(newCart);
    }
  }, [cart]);

  const handleChange = (evt) => {
    setOrder({ ...order, [evt.target.id]: evt.target.value });
    dispatch(editCartDetails(userId, { [evt.target.id]: evt.target.value }));
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Email
      </Typography>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id='email'
          name='email'
          label='Email Address'
          fullWidth
          variant='standard'
          value={order.email}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid />
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            value={order.firstName}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
            variant='standard'
            value={order.lastName}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='addressLine1'
            name='addressLine1'
            label='Address line 1'
            value={order.addressLine1}
            fullWidth
            autoComplete='shipping address-line1'
            variant='standard'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='addressLine2'
            name='addressLine2'
            label='Address line 2'
            value={order.addressLine2}
            fullWidth
            autoComplete='shipping address-line2'
            variant='standard'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            value={order.city}
            fullWidth
            autoComplete='shipping address-level2'
            variant='standard'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='state'
            name='state'
            label='State/Province/Region'
            value={order.state}
            fullWidth
            variant='standard'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Zip / Postal code'
            value={order.zip}
            fullWidth
            autoComplete='shipping postal-code'
            variant='standard'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='country'
            name='country'
            label='Country'
            value={order.country}
            fullWidth
            autoComplete='shipping country'
            variant='standard'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color='secondary' name='saveAddress' value='yes' />
            }
            label='Use this address for payment details'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
