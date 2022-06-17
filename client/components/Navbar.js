import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from '../store/cart';

const Navbar = () => {
  const userId = useSelector((state) => state.auth.id);
  const cart = useSelector((state) => state.cart);

  let cartCount = 0;

  if (cart.animals) {
    for (let i = 0; i < cart.animals.length; i++) {
      cartCount += cart.animals[i].CartAnimal.quantity;
    }
  }

  const isLoggedIn = !!userId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/home'>Home</Link>
            <Link className='cart' to='/checkout'>
              Cart:{cartCount}
            </Link>
            <a
              href='#'
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/animals'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link className='cart' to='/checkout'>
              Cart:{cartCount}
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
