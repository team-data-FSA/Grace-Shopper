import React from 'react';
import CurrencyFormat from 'react-currency-format';

function Total() {
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
              Total (0 items):
              <strong>0</strong>
            </p>
            <small className='total-gift'>
              <input type='checkbox' />
              This order contains a gift
            </small>
          </>
        )}
        //show amount in decimal places
        decimalScale={2}
        //total dollar amount of items in the cart
        value={0}
        displayType={'text'}
        //sperates the total price if it is over $1,000
        thousandSeparator={true}
        prefix={'$'}
      />
      <button>Checkout</button>
    </div>
  );
}

export default Total;
