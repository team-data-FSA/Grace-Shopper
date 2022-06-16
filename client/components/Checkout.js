import React, { useState, useEffect } from 'react';
import Total from './Total';
import CartItem from './CartItem';
import { fetchCart } from '../store/cart';
import { fetchAnimals } from '../store/animals';
import { fetchCartDetails } from '../store/cartDetails';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);

  const cartArray = useSelector((state) => state.cart);
  const cartObj = cartArray.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  const cartDetails = useSelector((state) => state.cartDetails);

  useEffect(() => {
    dispatch(fetchCart(userId));
    dispatch(fetchAnimals());
  }, []);

  useEffect(() => {
    dispatch(fetchCartDetails(cartObj));
  }, [cartArray]);

  return (
    <div
      className='checkout'
      style={{
        display: 'flex',
        padding: '20px',
        justifyContent: 'space-between',
      }}
    >
      <div className='cart-list' style={{ width: '50em' }}>
        <div>
          <h2
            className='cart-title'
            style={{ padding: '10px', borderBottom: '1px solid lightgray' }}
          >
            Cart Items
          </h2>
          <div>
            {cartDetails.length > 0 ? (
              cartDetails.map((item) => {
                return (
                  <CartItem
                    currAnimal={item.animal}
                    quantity={item.quantity}
                    key={item.animal.id}
                  />
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div className='cart-total' style={{}}>
        <Total cartDetails={cartDetails} />
      </div>
    </div>
  );
};

export default Checkout;
