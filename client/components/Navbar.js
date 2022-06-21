import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from '../store/cart';

const Navbar = () => {
  const userId = useSelector((state) => state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.cartCount;

  const isLoggedIn = !!userId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  return (
    <div className='header'>
      <div>
        <h1 id='site-title'>Where The Wild Things Are</h1>
      </div>
      <div>
        <nav>
          {isLoggedIn ? (
            <div className='nav-links'>
              {/* The navbar will show these links after you log in */}
              <Link to='/home'>Home</Link>
              <Link className='cart' to='/checkout'>
                Cart:{cartCount}
              </Link>
              <Link to='/profile'> Edit Profile</Link>
              <a
                href='#'
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </a>
              {isAdmin ? (
                <div>
                  <Link to='/add'> Add Animal</Link>

                  <Link to='/users'> View Users</Link>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div className='nav-links'>
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
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
