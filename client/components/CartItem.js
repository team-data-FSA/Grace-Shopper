import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCart } from '../store/cart';

const CartItem = (props) => {
  const animal = props.currAnimal;
  const quantity = props.quantity;

  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  return (
    <div className='cart-item'>
      <div>
        <img id='cart-img' src={animal.picture} />
      </div>
      <div style={{ width: '15em' }}>
        <h5>{animal.name}</h5>
      </div>
      <div style={{ marginRight: '20px' }}>
        <button
          className='change-quant-button decrease'
          onClick={() => {
            dispatch(editCart(userId, animal.id, quantity - 1));
          }}
        >
          -
        </button>
        <input
          type='number'
          className='cartQuant'
          name='cartQuant'
          value={quantity}
          onChange={(e) => {
            dispatch(editCart(userId, animal.id, e.target.value));
          }}
        />
        <button
          className='change-quant-button increase'
          onClick={() => {
            dispatch(editCart(userId, animal.id, quantity + 1));
          }}
        >
          +
        </button>
      </div>
      <div style={{ marginRight: '20px' }}>
        <h3>${animal.price}</h3>
      </div>
      <button
        className='remove-cart'
        onClick={() => {
          dispatch(editCart(userId, animal.id, 0));
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
