import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCart } from '../store/cart';
import { useHistory } from 'react-router-dom';

const CartItem = (props) => {
  const animal = props.currAnimal;
  const quantity = props.quantity;

  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className='cart-item'>
      <div>
        <img id='cart-img' src={animal.picture} />
      </div>
      <div style={{ width: '15em' }}>
        <h5>{animal.name}</h5>
      </div>
      <div>
        <button
          className='change-quant-button decrease'
          onClick={() => {
            dispatch(editCart(userId, animal.id, quantity - 1, history));
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
            dispatch(editCart(userId, animal.id, e.target.value, history));
          }}
        />
        <button
          className='change-quant-button increase'
          onClick={() => {
            dispatch(editCart(userId, animal.id, quantity + 1, history));
          }}
        >
          +
        </button>
      </div>
      <div>
        <h3>${animal.price}</h3>
      </div>
      <button
        className='remove-cart'
        onClick={() => {
          dispatch(editCart(userId, animal.id, 0, history));
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
