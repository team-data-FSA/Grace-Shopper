import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from '../store/cart';
import {
  AppBar,
  Button,
  Grid,
  Toolbar,
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = () => {
  const userId = useSelector((state) => state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false); //used for drawer

  const cartCount = cart.cartCount;

  const isLoggedIn = !!userId;

  const dispatch = useDispatch();

  const drawerWidth = 240;

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  return (
    <div>
      <div className='header'>
        <h1 id='site-title'>Where The Wild Things Are</h1>
      </div>

      <nav>
        {isLoggedIn ? (
          <AppBar position='fixed' style={{ background: '#303030' }}>
            {/* The navbar will show these links after you log in */}
            <Toolbar>
              <Grid container>
                <Grid item xs={5}>
                  <Button
                    color='inherit'
                    size='small'
                    className='navlink'
                    href={'/animals'}
                  >
                    Home
                  </Button>
                  <Button
                    color='inherit'
                    size='small'
                    className='navlink'
                    href={'/checkout'}
                  >
                    <ShoppingBasketIcon />
                    <span className='cart-count'>{cartCount}</span>
                  </Button>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={1}>
                  {/* Drawer Button */}
                  <Button
                    color='inherit'
                    size='small'
                    className='drawer'
                    aria-label='open drawer'
                    onClick={() => setOpen(true)}
                  >
                    {user.username}
                    <ArrowDropDownIcon />
                  </Button>
                  {/* Drawer */}
                  <SwipeableDrawer
                    anchor='right'
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => {}}
                  >
                    <div>
                      <Box textAlign='center' p={2}>
                        Welcome {}
                        {user.username}
                      </Box>
                      <Divider />
                      <List>
                        <ListItem>
                          <Link
                            to='/profile'
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            Edit Profile
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            to='/orders'
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            View Order History
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            to='#'
                            style={{ textDecoration: 'none', color: 'black' }}
                            onClick={() => {
                              dispatch(logout());
                            }}
                          >
                            Logout
                          </Link>
                        </ListItem>
                      </List>
                      <Divider />
                      {isAdmin ? (
                        <List>
                          <ListItem>
                            <Link
                              to='/add'
                              style={{ textDecoration: 'none', color: 'black' }}
                            >
                              Add Animal
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link
                              to='/users'
                              style={{ textDecoration: 'none', color: 'black' }}
                            >
                              View Users
                            </Link>
                          </ListItem>
                        </List>
                      ) : (
                        ''
                      )}
                    </div>
                  </SwipeableDrawer>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar position='fixed' style={{ background: '#303030' }}>
            {/* The navbar will show these links before you log in */}
            <Toolbar>
              <Grid container>
                <Grid item xs={4}>
                  <Button color='inherit' size='small'>
                    <Link to='/animals' className='navlink'>
                      Home
                    </Link>
                  </Button>
                  <Button color='inherit' size='small'>
                    <Link to='/checkout' className='navlink'>
                      <ShoppingBasketIcon />
                      <span className='cart-count'>{cartCount}</span>
                    </Link>
                  </Button>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={3}>
                  <Button color='inherit' size='small'>
                    <Link to='/login' className='navlink'>
                      Login
                    </Link>
                  </Button>
                  <Button color='inherit' size='small'>
                    <Link to='/signup' className='navlink'>
                      Sign-Up
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
