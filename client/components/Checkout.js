import React from 'react';
import Total from './Total';

const Checkout = () => {
  return (
    <div className='checkout' style={{ display: 'flex', padding: '20px', justifyContent: 'space-between'}}>
      <div className='cart-list' style={{ }}>
        <div>
          <h2
          className='cart-title'
          style={{ padding: '10px', borderBottom: '1px solid lightgray'}}
          >
            Cart Items
          </h2>
        </div>
      </div>

      <div className='cart-total' style={{}}>
        <Total />
      </div>
    </div>
  )
}

export default Checkout