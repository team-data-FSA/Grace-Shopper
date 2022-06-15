import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from '../store/cart';

const Navbar = () => {
  const userId = useSelector((state) => state.auth.id);
  const cart = useSelector((state) => state.cart);
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
              Cart:{cart.length}
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
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link className='cart' to='/checkout'>
              Cart:{cart.length}
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
