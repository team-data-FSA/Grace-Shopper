import React from 'react';
import { useEffect } from 'react';
import { fetchOrders } from '../store/animals';
import Order from './Order';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

const OrdersList = () => {
  const { orders, auth } = useSelector((state) => {
    return state;
  });

  // dispatch actions
  const dispatch = useDispatch();

  // component did mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div>
      <Typography variant='h4' component='div'>
        Order History
      </Typography>
      <ul className='container'>
        {orders.length > 0 ? (
          orders.map((order) => <Order order={order} />)
        ) : (
          <div>No previous orders</div>
        )}
      </ul>
    </div>
  );
};

export default OrdersList;
