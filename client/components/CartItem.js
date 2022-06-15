import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCart } from '../store/cart';
import { useHistory } from 'react-router-dom';

const CartItem = (props) => {
  const animal = props.currAnimal[0];
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
      <div>
        <h5>{animal.name}</h5>
        <label htmlFor='cartQuant'>Quantity:</label>
        <input
          type='number'
          name='cartQuant'
          value={cartQuant}
          onChange={(e) => setCartQuant(e.target.value)}
        />
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
