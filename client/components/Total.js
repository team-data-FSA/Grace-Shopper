import React from 'react';
import CurrencyFormat from 'react-currency-format';

function Total(props) {
  let cartDetails = props.cartDetails;
  let total = 0;
  let numItems = 0;
  for (let i = 0; i < cartDetails.length; i++) {
    total += cartDetails[i].quantity * cartDetails[i].animal.price;
    numItems += cartDetails[i].quantity;
  }

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
            <small className='total-gift'>
              <input type='checkbox' />
              This order contains a gift
            </small>
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
        href='/confirmation'
        className='button'
        onClick={() => console.log('empty')}
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
        Checkout
      </a>
    </div>
  );
}

export default Total;
