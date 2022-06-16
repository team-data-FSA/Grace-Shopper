import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCart } from '../store/cart';
import { useHistory } from 'react-router-dom';

const CartItem = (props) => {
  const animal = props.currAnimal;
  const quantity = props.quantity;

  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  const history = useHistory();

  const [cartQuant, setCartQuant] = useState(quantity);

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
          onClick={() => setCartQuant(cartQuant - 1)}
        >
          -
        </button>
        <input
          type='number'
          className='cartQuant'
          name='cartQuant'
          value={cartQuant}
          onChange={(e) => setCartQuant(e.target.value)}
        />
        <button
          className='change-quant-button increase'
          onClick={() => setCartQuant(cartQuant + 1)}
        >
          +
        </button>
        <button
          type='submit'
          onClick={() =>
            dispatch(editCart(userId, animal.id, cartQuant, history))
          }
        >
          Update
        </button>
      </div>
      <div>
        <h3>${animal.price}</h3>
      </div>
    </div>
  );
};

export default CartItem;
