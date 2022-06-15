import React from 'react';

//Assuming input is Animal instance, quantity
const CartItem = (props) => {
  const item = props.item;
  const quantity = props.quantity;

  return (
    <div>
      <img src={item.picture} />
      <div>
        <h3>{item.name}</h3>
        <h5>${item.price}</h5>
        <h5>{quantity}</h5>
      </div>
    </div>
  );
};

export default CartItem;
