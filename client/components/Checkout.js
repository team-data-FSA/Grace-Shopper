import React, { useState, useEffect } from 'react';
import Total from './Total';
import CartItem from './CartItem';
import { fetchCart } from '../store/cart';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id);
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  return (
    <div
      className='checkout'
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'space-between',
      }}
    >
      <div className='cart-list' style={{ width: '50em' }}>
        <div>
          <h2
            className='cart-title'
            style={{ padding: '8px', borderBottom: '1px solid lightgray' }}
          >
            Cart Items
          </h2>
          <div>
            {cart.animals ? (
              cart.animals.map((item) => {
                return (
                  <CartItem
                    currAnimal={item.animal}
                    quantity={item.quantity}
                    key={item.animal.id}
                  />
                );
              })
            ) : (
              <p>Cart is empty!</p>
            )}
          </div>
        </div>
      </div>
      <div className='cart-total' style={{}}>
        <Total />
      </div>
    </div>
  );
};

export default Checkout;
