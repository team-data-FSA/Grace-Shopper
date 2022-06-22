import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCart } from '../store/cart';
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const userAuth = useSelector((state) => state.auth);
  const userId = userAuth.id;
  const cart = useSelector((state) => state.cart);
  const cartAnimals = cart.animals;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  const payments = [
    { name: 'Card holder', detail: cart.cardName },
    {
      name: 'Card number',
      detail: 'xxxx-xxxx-xxxx-' + cart.cardNumber.slice(-4),
    },
    { name: 'Expiration date', detail: cart.expDate },
  ];

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartAnimals ? (
          cartAnimals.map((item) => (
            <ListItem key={item.animal.name} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={item.animal.name} />
              <Typography variant='body2'>
                {item.quantity} x ${item.animal.price}
              </Typography>
            </ListItem>
          ))
        ) : (
          <p />
        )}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            ${cart.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {cart.firstName} {cart.lastName}
          </Typography>
          <Typography gutterBottom>{cart.addressLine1}</Typography>
          {cart.addressLine2 ? (
            <Typography gutterBottom>{cart.addressLine2}</Typography>
          ) : (
            <p />
          )}
          <Typography gutterBottom>
            {cart.city}, {cart.state} {cart.zip} {cart.country}
          </Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
