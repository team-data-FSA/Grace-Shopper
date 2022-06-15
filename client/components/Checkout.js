import React, { useState, useEffect } from 'react';
import Total from './Total';
import CartItem from './CartItem';
import { fetchCart } from '../store/cart';
import { fetchAnimals } from '../store/animals';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const unformattedCart = useSelector((state) => state.cart);
  const cartObj = unformattedCart.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
  const cart = Object.keys(cartObj).map((key) => [Number(key), cartObj[key]]);
  const animals = useSelector((state) => state.animals);

  useEffect(() => {
    dispatch(fetchCart(userId));
    dispatch(fetchAnimals());
  }, []);

  return (
    <div
      className='checkout'
      style={{
        display: 'flex',
        padding: '20px',
        justifyContent: 'space-between',
      }}
    >
      <div className='cart-list' style={{}}>
        <div>
          <h2
            className='cart-title'
            style={{ padding: '10px', borderBottom: '1px solid lightgray' }}
          >
            Cart Items
          </h2>
          <div className='cart-list'>
            {animals.length > 0 ? (
              cart.map((item) => {
                let currAnimal = animals.filter(
                  (animal) => animal.id === item[0]
                );
                return (
                  <CartItem
                    currAnimal={currAnimal}
                    quantity={item[1]}
                    key={item[0]}
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
        <Total />
      </div>
    </div>
  );
};

export default Checkout;
