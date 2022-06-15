import React from 'react';

const CartItem = (props) => {
  const animal = props.currAnimal[0];
  const quantity = props.quantity;

  console.log(animal);

  return (
    <div className='cart-item'>
      <div>
        <img id='cart-img' src={animal.picture} />
      </div>
      <div>
        <h5>{animal.name}</h5>
        <h5>Quantity: {quantity}</h5>
      </div>
    </div>
  );
};

export default CartItem;
