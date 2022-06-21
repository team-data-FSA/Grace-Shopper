import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// The following are for Material-UI components
import {
  Typography, //text
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';

const Order = (props) => {
  const order = props.order;
  const orderAnimals = order.animals;

  return (
    <div className='container'>
      <Card>
        <CardMedia
          component='img'
          alt={`order icon`}
          image={
            'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/order-512.png'
          }
          height='20'
          width='20'
          className='media'
        />
        <CardContent>
          <Typography variant='h6' component='div'>
            Order #{order.id}
          </Typography>
          <Typography variant='body1' component='div'>
            Order placed: {order.datePlaced}
          </Typography>
          <Typography variant='body1' component='div'>
            Date shipped: {order.dateShipped}
          </Typography>
          <Typography variant='body1' component='div'>
            Shipping Address: <br />
            {order.addressLine1} <br />
            {order.addressLine2} <br />
            {order.city}, {order.state} {order.zip} {order.country}
          </Typography>
          <Typography variant='body1' component='div'>
            Order details:
          </Typography>
          {orderAnimals.map((animal) => {
            return (
              <Typography>
                {animal.animal.name} -- {animal.quantity} x{' '}
                {animal.animal.price}
              </Typography>
            );
          })}
          <Typography variant='h6' component='div'>
            Total Price: ${order.total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Order;
