import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';

function Total() {
  let total = useSelector((state) => state.cart.total);
  let numItems = useSelector((state) => state.cart.cartCount);

  return (
    <div
      className='total'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        width: '300px',
        height: '100px',
        border: '1px solid #dddddd',
        borderRadius: '3px',
        backgroundColor: '#f3f3f3',
      }}
    >
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Total ({numItems} items): {'      '}
              <strong>{value}</strong>
            </p>
          </>
        )}
        //show amount in decimal places
        decimalScale={2}
        //total dollar amount of items in the cart
        value={total}
        displayType={'text'}
        //sperates the total price if it is over $1,000
        thousandSeparator={true}
        prefix={'$'}
      />
      <a
        href='/order-checkout'
        className='button'
        style={{
          display: 'inline-block',
          textAlign: 'center',
          textDecoration: 'none',
          color: '#ffffff',
          backgroundColor: '#7aa8b7',
          borderRadius: '6px',
          outline: 'none',
        }}
      >
        Proceed to Checkout
      </a>
    </div>
  );
}

export default Total;
